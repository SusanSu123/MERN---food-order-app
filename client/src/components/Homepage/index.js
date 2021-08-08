import React from "react";
import backImage from './pizza.jpeg';
import './style.css';



function Homepage() {

    return (
        <div>
            <div style={{
                backgroundImage: `url(${backImage})`,
                // backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '1000px',
                padding: '0',

                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>

                <div className='introduce'>

                    <h3>About Us</h3>
                    <p>
                        Here at SU's Kitchen, we are constantly striving to improve our service and quality in order to give our customers the very best experience.
                        As a result, we are finally proud to unveil and introduce our latest improvement, our new online ordering website!
                        You can now relax at home and order your favourite, freshly prepared meals from  in Melbourne. You can even pay online!
                    </p>

                    <h3> Our Service</h3>
                    <p>
                        We’re passionate about providing delicious and high-quality food, our priority is to satisfy all of our customers needs -
                        we offer a variety of excellent food, prepared with the freshest and finest ingredients, to the highest standard. Our Takeaway offers
                        delicious food at competitive prices! We now have a website, where you can order online - choose from our entire menu, order your favourite
                        dishes and have them delivered straight to your door!

                        Thank you for visiting SU's Kitchen in Melbourne. We hope you enjoy our online ordering website and your food.
                    </p>

                    <h3>Contact Us</h3>

                    <p>

                        Phone: 03 9000 8888<br />
                        Email: sukitchen@gmail.com<br />
                        Address: 111 Bourke Street, VIC 3000


                    </p>

                </div>
            </div>


        </div >
    )
}
export default Homepage;
