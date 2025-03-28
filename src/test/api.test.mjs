import * as chai from 'chai';
import chaiHttp from "chai-http";
 import app from "../../server.mjs";
import request from 'supertest'

const { expect } = chai;
 chai.use(chaiHttp);
describe("Api Test", () => {
    describe("POST /login", () => {
        it("should return 401 for invalid credentials", (done) => {
           request(app)
                .post("/login")
               .send({ email: "admin@gmail.com", password: "admin" })
                .end((err , res ) => {
                   expect(res).to.have.status(401);
                    expect(res.body).to.have.property("message", "Invalid email or password");
                    done();
                });
        });

        it("should return success message for valid credentials", (done) => {
            request(app)
                .post("/login")
                .send({email: "admin@gmail.com", password: "admin" }) // Use real credentials from DB
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Login successful");
                    done();
                });
        });
    });

    describe("Orders API", () => {
        let orderId;

        it("should fetch all orders", (done) => {
           
                request(app)
                .get("/orders")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });

        it("should create a new order", (done) => {
            
                request(app)
                .post("/orders/new")
                .send({
                    customerName: "John Doe",
                    totalAmount: 150,
                    status: "pending",
                    date: "2025-03-24",
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "Order added successfully");
                    orderId = res.body.orderId;
                    done();
                });
        });

        it("should get order by ID", (done) => {
           
            request(app)
                .get(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("customerName", "John Doe");
                    done();
                });
        });

        it("should update an order by its ID", (done) => {
           
                request(app)
                .put(`/orders/${orderId}`)
                .send({
                    customerName: "Jane Doe",
                    totalAmount: 200,
                    status: "completed",
                    date: "2025-03-25",
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Order updated successfully");
                    done();
                });
        });

        it("should delete an order by its ID", (done) => {
           
                request(app)
                .delete(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });


    describe("Products API", () => {
        let productId;

        it("should fetch all products", (done) => {
            request(app)
                .get("/products")
                .end((err, res ) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });

        it("should create a new product", (done) => {
            request(app)
                .post("/products/new")
                .send({
                    name: "Laptop",
                    price: 1200,
                    category: "Electronics",
                    description: "Gaming Laptop",
                })
                .end((err , res ) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "Product added successfully");
                    productId = res.body.productId;
                    done();
                });
        });

        it("should get product by ID", (done) => {
            request(app)
                .get(`/products/${productId}`)
                .end((err , res  ) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("name", "Laptop");
                    done();
                });
        });

        it("should update a product by ID", (done) => {
            request(app)
                .put(`/products/${productId}`)
                .send({
                    name: "Gaming Laptop",
                    price: 1300,
                    category: "Electronics",
                    description: "High-performance gaming laptop",
                })
                .end((err , res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Product updated successfully");
                    done();
                });
        });

        it("should delete a product by ID", (done) => {
            request(app)
                .delete(`/products/${productId}`)
                .end((err , res ) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });


});