import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../compoents/Rating'
import axios from 'axios'

const ProductScreen = () => {
    const { id } = useParams();
    // const product = products.find(p => p._id === id)
    const [product, setProduct] = useState({})

    const fetchProduct = async () => {
        const { data } = await axios.get(`/api/products/${id}`)

        setProduct(data)
    }

    useEffect(() => {
        fetchProduct()
    }, [])


    if (!product) {
        return( 
            <>
                <div>Product not found</div>
                <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            </>
        );
    }
    
  return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>

        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color= '#f8e825'
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button className='btn-block w-100' type='button' disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
        </Row>
    </>
  )
}

export default ProductScreen