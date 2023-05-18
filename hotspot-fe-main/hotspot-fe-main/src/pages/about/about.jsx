import './about.css'
import backgroundImage from './../../assets/images/about-background.jpg'

function About() {
    return (
        <>
        {/* <div className='background-set'></div> */}
        {/* <img src={backgroundImage} class="img-fluid" alt="..."></img> */}
        {/* <div class="has-bg-img">
            <img class="bg-img mw-100 h-auto w-auto" src={backgroundImage} alt="..."/>
        </div> */}
        <div className='bg-dark'>
            <div className='background-set'>
                <div className='mt-4 pt-4 w-50'>
                    <h1 className='m-4 p-4'>Bringing the world together through live experiences</h1>
                    <p className='m-4 p-4'>HotSpots is a event hosting platform for live experiences that allows anyone to create, share, find and attend events that fuel their passions and enrich their lives. From music festivals, marathons, conferences, community rallies, and fundraisers, to gaming competitions and air guitar contests. Our mission is to bring the world together through live experiences.</p>
                </div>
                <div className="makers">
                    <h1>Made by:<div className="roller">
                        <span id="rolltext">Mo Minhaj<br/>
                        <span id="spare-time">Islam</span></span><br/>
                        </div>
                    </h1> 
                </div>
            </div>
        </div>
        </>
    );
}

export default About;