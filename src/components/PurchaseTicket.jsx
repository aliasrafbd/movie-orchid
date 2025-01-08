import { easeOut } from 'motion';
import { motion } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import team1 from '../../src/assets/team/team-01.jpg';
import team2 from '../../src/assets/team/team-02.jpg';

const PurchaseTicket = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://movie-portal-server-three.vercel.app/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                Swal.fire({
                    title: 'Success!',
                    text: 'You have purchase a movie ticket',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="py-16 mx-auto flex flex-col justify-center items-center">
            <div>
                <motion.h2 
                animate={
                    {x: 50, }
                }
                transition={
                    {duration: 2, delay: 1, ease: easeOut, repeat: Infinity}
                }
                
                className="mb-12 text-3xl font-bold">Book a <motion.span
                animate={
                    {color: ['#33df33', '#33ffgg', '#ff6133'], }
                }
                transition={
                    {duration: 1.5, delay: 1, repeat: Infinity}
                }
                
                >Ticket</motion.span> for you now!</motion.h2>
            </div>
            <div className='flex gap-20'>
                <form className="space-y-6 flex-1" onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        First Name: <br />
                        <input
                            className="mb-2 input h-8 w-full input-bordered"
                            type="text"
                            {...register('firstName', { required: true })}
                        />
                    </label>
                    <br />
                    <label>
                        Last Name: <br />
                        <input
                            className="input mb-2 h-8 w-full input-bordered"
                            type="text"
                            {...register('lastName', { required: true })}
                        />
                    </label><br />
                    <label>
                        Movie Name: <br />
                        <input
                            className="input mb-2 h-8 w-full input-bordered"
                            type="text"
                            {...register('movieName', { required: true })}
                        />
                    </label><br />
                    <label>
                        Transaction Number: <br />
                        <input
                            className="input h-8 w-full input-bordered"
                            type="text"
                            {...register('transactionNumber', { required: true })}
                        />
                    </label><br />
                    <label>
                        Contact Number: <br />
                        <input
                            className="input h-8 w-full input-bordered"
                            type="number"
                            {...register('contactNumber', { required: true })}
                        />
                    </label>
                    <input
                        type="submit"
                        className="rounded-xl btn w-full"
                        value="Submit"
                    />
                </form>
                <div className='flex-1 w-full'>
                    <div className=''>
                        <motion.img
                            src={team1}

                            animate={
                                {y:[50,100,50]}
                            }
                            transition={
                                {duration: 8, repeat: Infinity}
                            }


                            className="max-w-lg w-64 h-56 rounded-t-[45px] border-l-4 border-b-4 border-black rounded-br-[45px]" />
                        <motion.img
                            src={team2}

                            animate={
                                {x:[100,150,100]}
                            }
                            transition={
                                {duration: 8, delay: 5, repeat: Infinity}
                            }
                            className="max-w-sm w-64 rounded-t-[45px] border-l-4 border-b-4 border-black rounded-br-[45px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseTicket;
