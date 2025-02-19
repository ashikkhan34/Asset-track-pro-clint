import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckOut = () => {
    const { user, loading } = useAuth()
    const [totalPrice, setTotalPrice] = useState(0)
    const axiosPublic = useAxiosPublic()
    const { data = [] } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/email/${user?.email}`)
            setTotalPrice(res.data.price)
            return res.data
        }
    })
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        // const card = elements.getElement(CardElement)
        // if (!card) {
        //     return
        // }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            // card
        })
        if (error) {
            console.log('Payment error', error)
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod)
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.name || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                //now save th payment id the database
                const payments = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),//utc date convert. use moment js to 
                    // cartIds:cart.map(item => item._id),
                    // menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payment', payments)

                console.log('payment saved', res.data)
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'thank you',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                refetch()

            }
        }
    }
    return (
        <div>
            <h1>price : {totalPrice}</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className='btn btn-success m-10 ' type="submit" >
                    Pay
                </button>
                <p className='text-red-700'>{error}</p>
                {transactionId && <p className='text-green-600'>Your Transaction id : {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOut;