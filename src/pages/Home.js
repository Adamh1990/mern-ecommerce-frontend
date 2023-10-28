import mall from "../images/home-mall.jpg";
import featured from "../images/featured.jpg";
import salebanner from "../images/a-discount.jpg";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-top">
      <img 
      src={mall} 
      alt="home-banner" 
      className="home-banner" />

      <div 
      className="featured-products-container">
        <h2>Last products</h2>
        {/*last products*/}
      </div>

      <div className="home-category-all">
        <Link
          to="/category/all"
          // style={{
          //   textAlign: "right",
          //   display: "block",
          //   textDecoration: "none",
          // }}
        >
          See More {">>"}
        </Link>
      </div>
      {/*sale banner*/}
      <div 
      className="sale-banner-container">
        <img 
        src={salebanner} 
        alt="sale-banner" className="sale-banner" />
      </div>

      <div 
      img src={featured}
      className="recent-products-container container mt-4">
        <h2>Categories</h2>

        <Row>
          {categories.map((category) => (
            <LinkContainer to={`/category${category.name.toLocaleLowerCase()}`}>
              <Col md={4}>

                <div className="category-tile"
                style={{
                  backgroundImage: 
                    `linear-gradient(
                    rgba(0, 0, 0, 0.5), 
                    rgba(0, 0, 0, 0.5)), 
                    url(${category.img})`,
                    gap: "10px"
                    }}>
                      {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
