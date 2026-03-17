import { Link } from 'react-router-dom';

export function Main() {
    const heroStyle = {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white'
    };

    return (
        <main style={heroStyle} className="min-vh-100 d-flex align-items-center py-5 py-md-0">
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-md-6 text-center text-md-start">
                        <h1 className="display-4 fw-bold mb-3">
                            Welcome to Tech's Store!
                        </h1>
                        <p className="fs-5 opacity-75">
                            In this web you can buy any phone or computer you want to.
                        </p>
                        <div className="mt-4">
                            <Link to={'/products'} className="btn btn-primary btn-lg rounded-pill px-4 shadow">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner overflow-hidden">
                            <div className="carousel-item active h-100" data-bs-interval="2000">
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <img 
                                        src="/assets/carousel-computer.png" 
                                        className="d-block" 
                                        alt="Computers" 
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                    />
                                </div>
                            </div>
                            <div className="carousel-item h-100" data-bs-interval="2000">
                                <div className="d-flex align-items-center justify-content-center h-100">
                                    <img 
                                        src="/assets/carousel-phone.png" 
                                        className="d-block" 
                                        alt="Phones" 
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                    />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}