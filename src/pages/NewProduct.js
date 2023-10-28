import React, { useState } from "react";
import { Container, Alert, Col, Form, Row, Button, Link} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/projectApi";
import axios from "axios";
import "./NewProduct.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation();

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "Adamh1990",
            uploadPreset:"gngmfqd5",
        },
        (error, result) => {
            if(!error && result.event === "success") {
                setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
            }
        }
    );
    widget.open();
  }

  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
        .delete(`/images/${imgObj.public_id}/`)
        .then((res) => {
            setImgToRemove(null);
            setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
        })
        .catch((e) => console.log(e));
}

function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
        return alert("Please fill out all the fields");
    }
    createProduct({ name, description, price, category, images }).then(({ data }) => {
        if (data.length > 0) {
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    });
}

  return (
    <Container>
      <Row>
        <Col 
          md={6} 
          className="new-product-form-container">
            <Form 
                style={{ width: "100%" }}>
                    <h1>Create a New Listing</h1>

                    {isSuccess && 
                    <Alert 
                      variant="success">
                        Successfully Created New Product Listing
                    </Alert>}

                    {isError && 
                    <Alert 
                      variant="danger">
                        {error.data}
                    </Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Product Name
                        </Form.Label>

                        <Form.Control 
                            type="text" 
                            placeholder="Enter Product Name" 
                            value={name} 
                            required
                            onChange={(e)=> 
                                setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Product Description
                        </Form.Label>

                        <Form.Control 
                            as="textarea" 
                            placeholder="Enter Product Description" 
                            style={{
                              height: "100px"
                            }}
                            value={description} 
                            required
                            onChange={(e)=> 
                                setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Price ($)
                        </Form.Label>

                        <Form.Control 
                            type="number" 
                            placeholder="Product Price ($)" 
                            value={price} 
                            required
                            onChange={(e)=> 
                                setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                        <Form.Label>
                            Category
                        </Form.Label>

                        <Form.Select>
                            <option defaultValue="disabled">
                                -- Select One --
                            </option>
                            <option value="technology">
                                Technology
                            </option>
                            <option value="household">
                                Household
                            </option>
                            <option value="mens-clothing">
                                Men's Clothing
                            </option>
                            <option value="womens-clothing">
                                Women's Clothing
                            </option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Image
                            </Button>
                            <div className="image-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="" />
                                        {imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                    <Form.Group>
                        <Button 
                            type="submit" 
                            disabled={isLoading || isSuccess}>
                                Create Product
                        </Button>
                    </Form.Group>

            </Form>
        </Col>
        <Col
         md = {6} 
         className="new-roduct-image-container">
        </Col>
      </Row>
    </Container>

  );
}
                                                        

export default NewProduct;