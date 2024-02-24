import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios.js";
import Loader from "../../components/loader.js";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs";
import { OrderModal } from "../../components/ordersModal.js";

const GetOneOrders = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [orders, SetOrders] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const getCategory = async () => {
    try {
      const res = await axios.get("/api/v1/branches/" + id);
      console.log(res.data);
      setCategory(res.data.data);
      setItemsPerPage(10);
      setTotalPages(res?.data?.pagenation?.totalPages);

      setCurrentPage(res?.data?.pagenation?.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrder = async () => {
    try {
      const res = await axios.get(
        "/api/v1/branches/orders/" +
          id +
          `?page=${currentPage}&limit=${itemsPerPage}`
      );
      console.log(res);
      SetOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h1>GetOneOrders</h1>
      <div>Bo'lim {category?.name}</div>
      <div className="card">
        {loading ? (
          <Loader />
        ) : (
          <div className="table-responsive text-nowrap">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User name</th>
                  <th>Yaratilgan vaqti</th>
                  <th>Qo'shimcha</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {orders?.map((c, idx) => {
                  const curr =
                    currentPage === 1
                      ? currentPage + idx
                      : currentPage * itemsPerPage - (itemsPerPage - 1) + idx;
                  return (
                    <tr
                      key={c.id}
                      data-bs-toggle="modal"
                      data-bs-target="#addProductModal"
                      onClick={() => setOrderId(c.id)}
                    >
                      <td>{curr}</td>
                      <td>{c.user.name}</td>
                      <td>
                        {dayjs(c.created_at).format("MMMM D, YYYY h:mm A")}
                      </td>
                      <td>Qo'shimcha</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {
          <div className={`row my-3 ${loading && "d-none"}`}>
            <div className="d-flex justify-content-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                previousClassName="page-item"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                onPageChange={getOrder}
                pageCount={totalPages}
                pageRangeDisplayed={2}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                disabledClassName="disabled"
                activeClassName="active"
                pageLinkClassName="page-link"
                pageClassName="page-item"
              />
            </div>
          </div>
        }
      </div>
      <OrderModal id={orderId} />
    </div>
  );
};

export default GetOneOrders;
