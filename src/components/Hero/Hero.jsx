import React from 'react'
import Slider from 'react-slick';

import Image1 from '../../assets/Biz2/Tax_Planning___Optimization-removebg-preview.png'
import Image2 from '../../assets/Biz2/Government_taxes_and_calculation_tax_return_concept_tax_return_online_for_tax_payment_government_state_taxes_paperwork_financial_research_report_generative_ai___Premium_AI-generated_image-removebg-pre.png'
import Image3 from '../../assets/Biz2/Analytics_Illustration-removebg-preview.png'

const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "About Us",
        description: "Biz2Optima Solutions (Pvt) Ltd is a forward-thinking business consultancy specializing in Pakistan’s taxation laws. Our expert team delivers end-to-end services in accountancy, tax compliance, strategic consultancy, marketing, sales, and business registration. We simplify financial and operational processes — driving growth, profitability, and regulatory compliance.",
    },
    {
        id: 2,
        img: Image2,
        title: "Our Vision",
        description: "To simplify taxation and business services for all — driving financial literacy, growth, and equality with a focus on youth and global impact.",
    },
    {
        id: 3,
        img: Image3,
        title: "Our Mission",
        description: "We simplify taxation, accounting, business registration, and consultancy to help SMEs and individuals thrive. By promoting financial literacy and equal access, we drive sustainable growth locally and globally.",
    }
]

const Hero = ({handleOrderPopup}) => {

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        puaseOnHover: false,
        puaseOnFocus: true,
    };

    return (
        <div className='relative overflow-hidden  min-h-[450px] sm:min-h-[600px] bg-gray-100 flex justify-center items-center  dark:bg-gray-950 dark:text-white duration-200'>
            {/* background pattern */}
            <div className='h-[700px] w-[700px] bg-sky-700 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]'></div>
            {/* hero section */}
            <div className='container  pb-8 sm:pb-0'>
                <Slider  {...settings}>
                    {ImageList.map((data) => (
                        <div>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                {/* text content section  */}
                                <div className='flex flex-col justify-center gap-20 pt-12  sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                                    <p data-aos="zoom-in" data-aos-duration="500" data-aos-once="true" className='text-sm'>{data.description}</p>
                                    
                                </div>
                                {/* image section  */}
                                <div className='order-1 sm:order-2'>
                                    <div data-aos="zoom-in" data-aos-duration="500" data-aos-once="true" className='relative z-10 '>
                                        <img src={data.img} alt="" className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Hero