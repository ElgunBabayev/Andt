import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";

function ProductTab() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("https://northwind.vercel.app/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setproducts(data);
      });
  };
  const deleteProd = (id) => {
    fetch(`https://northwind.vercel.app/api/orders/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) getProducts();
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CustomerId",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
    },
    {
      title: "Ship Via",
      dataIndex: "shipVia",
      key: "shipVia",
      sorter: (a, b) => a.shipVia > b.shipVia,
    },
    {
      title: "Settings",
      dataIndex: "id",
      render: (id) => <Button onClick={() => deleteProd(id)}>Delete</Button>,
    },
  ];

  return (
    <div>
      <Table dataSource={products} columns={columns} />;
    </div>
  );
}

export default ProductTab;
