import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExecutiveOrders = () => {
  const [orders, setOrders] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/executive-orders")
      .then(res => setOrders(res.data.results))
      .catch(err => console.error("Error fetching EOs", err));
  }, []);

  const summarize = async (order) => {
    setLoadingId(order.document_number);
    try {
      const res = await axios.post("http://localhost:8000/api/summarize", {
        content: order.abstract || order.title
      });
      setSummaries(prev => ({ ...prev, [order.document_number]: res.data.summary }));
    } catch (err) {
      console.error("Summarization error", err);
    }
    setLoadingId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Latest Trump Executive Orders</h2>
      {orders.map(order => (
        <div key={order.document_number} style={{ border: "1px solid #ccc", padding: 10, margin: "10px 0" }}>
          <h3>{order.title}</h3>
          <p><strong>Date:</strong> {order.publication_date}</p>
          <p><strong>Abstract:</strong> {order.abstract || "No summary available."}</p>
          <button onClick={() => summarize(order)}>
            {loadingId === order.document_number ? "Summarizing..." : "Summarize with AI"}
          </button>
          {summaries[order.document_number] && (
            <p><strong>AI Summary:</strong> {summaries[order.document_number]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExecutiveOrders;
