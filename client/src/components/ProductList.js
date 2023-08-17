import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      getProducts();
      hideModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success mb-4">
        Add New Goods
      </Link>
      <div className="columns is-multiline">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Image" />
                </figure>
              </div>

              <div className="card-content">
                <div className="media">
                  <div
                    className="media-content p-5"
                    style={{
                      backgroundColor: "lightblue",
                      borderRadius: "2rem",
                    }}
                  >
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
                <p class="title is-4">
                  <span>
                    <p className="title is-5">Stock: {product.stock}</p>
                  </span>
                </p>
              </div>

              <footer className="card-footer">
                <p class="card-footer-item">
                  <span>
                    Selling Price{" "}
                    <p className="title is-4">{product.sellingprice}</p>
                  </span>
                </p>
                <p class="card-footer-item">
                  <span>
                    Retail Price{" "}
                    <p className="title is-4">{product.retailprice}</p>
                  </span>
                </p>
              </footer>

              <footer className="card-footer">
                <Link
                  to={`edit/${product.id}`}
                  className="card-footer-item button is-info is-light"
                >
                  Edit
                </Link>
                <a
                  className="card-footer-item button is-danger is-light "
                  onClick={showModal}
                >
                  Delete
                </a>

                {isModalVisible && (
                  <div class="modal is-active">
                    <div class="modal-background" onClick={hideModal}></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">DELETE DATA !!</p>
                        <button
                          class="delete"
                          aria-label="close"
                          onClick={hideModal}
                        ></button>
                      </header>
                      <section class="modal-card-body">
                        <h1>
                          ARE YOU SURE YOU WANT TO DELETE ALL INFORMATION IN
                          THIS DATA?
                        </h1>
                      </section>
                      <footer class="modal-card-foot">
                        <button
                          className="button is-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          DELETE
                        </button>
                        <button class="button" onClick={hideModal}>
                          Cancel
                        </button>
                      </footer>
                    </div>
                  </div>
                )}
                {/* <a onClick={() => deleteProduct(product.id)} className="card-footer-item">Delete</a> */}
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
