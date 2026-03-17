import './Footer.css'

export function Footer () {

    const currentYear = new Date().getFullYear();


    return (
        <footer className="foo__bckg d-flex justify-content-around align-items-center">
            <div>
                <p>2000 Euclid Av.</p>
                <p>Phone: +1 381234567</p>
                <p>Miami Beach, Florida, US</p>
            </div>
            <div className="vr"></div>
            <div><strong>Techs's Store</strong></div>
            <div className="vr"></div>
            <div className='foo__info-dev'>
                <p>Powered by: Arquez</p>
                <p>{currentYear}</p>
            </div>
        </footer>
    )
}