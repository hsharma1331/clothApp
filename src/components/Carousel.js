import React from 'react'

export default function Carousel(props) {
    return (
        <div >
            <div id="carouselExampleFade" className="carousel slide carousel-fade" >
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: 2 }}>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => props.searchFun(e.target.value)} />
                            {/* <button className="btn btn-outline-primary text-white bg-primary" type="submit">Search</button> */}
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300×300/?denim" className="d-block" style={{ filter: "brightness(30%)" }} alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?jeans" className="d-block " style={{ filter: "brightness(30%)" }} alt='' />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?shirt" className="d-block " style={{ filter: "brightness(30%)" }} alt='' />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
