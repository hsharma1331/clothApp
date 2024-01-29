import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {

    const [search1, setSearch] = useState('')
    const [clothCat, setClothCat] = useState([]);
    const [clothData, setClothData] = useState([]);

    function funSearch(searchData) {
        setSearch(searchData);
    }

    const loadData = async () => {

        let response = await fetch("http://localhost:5000/api/clothData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        // console.log(response[0],response[1]);
        setClothCat(response[0]);
        setClothData(response[1]);
    }
    useEffect(() => {
        loadData();
    }, [])           //empty array so that it will only be called once when the page is loaded

    return (
        <div>
            <Navbar />
            <div>
                <Carousel searchFun={funSearch} />
            </div>
            <div className="container">
                {
                    clothCat !== [] ? clothCat.map((data) => {
                        return (<div className="row mb-3">
                            <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                            <hr />
                            {
                                clothData !== [] ? clothData.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search1.toLocaleLowerCase())))
                                    .map(filterItems => {
                                        return (
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card
                                                    // catName={filterItems.CategoryName}
                                                    // name={filterItems.name}
                                                    // img={filterItems.img}
                                                    // desc={filterItems.description}
                                                    clothItems = {filterItems}
                                                    options={filterItems.options[0]}
                                                />
                                            </div>
                                        )
                                    })
                                    : <div>No such data</div>
                            }
                        </div>
                        )
                    })
                        : ""
                }
            </div>
            <Footer />
        </div>
    )
}