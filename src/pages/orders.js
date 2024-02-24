import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import ReactPaginate from "react-paginate";
import Loader from "../components/loader";
import { useLocation, useHistory, useNavigate } from "react-router-dom";

function Orders() {
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/branches?page=${currentPage}&limit=${itemsPerPage}`
      );
      setItemsPerPage(10);
      console.log("categories", res.data.data);
      setTotalPages(res?.data?.pagenation?.totalPages);
      setCurrentItems(res?.data?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(`Error in fetching category: ${err}`);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const clickOrders = (id) => {
    navigate(`/orders/${id}`);
  };
  const handlePageClick = (e) => {
    setCurrentPage(e?.selected + 1);
  };

  useEffect(() => {
    fetchCategories();
  }, [categoryId, currentPage]);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div className="card-header row">
          <h5 className="col">Orders</h5>
          <div className="col d-flex justify-content-end">
            <button
              className="btn"
              type="button"
              title="Reload"
              onClick={fetchCategories}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
              </svg>
            </button>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="table-responsive text-nowrap">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ЗАГОЛОВОК</th>
                  <th>ИЗОБРАЖЕНИЕ</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {currentItems.map((c, idx) => {
                  const curr =
                    currentPage === 1
                      ? currentPage + idx
                      : currentPage * itemsPerPage - (itemsPerPage - 1) + idx;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => {
                        clickOrders(c.id);
                      }}
                    >
                      <td>{curr}</td>
                      <td>{c.name}</td>
                      <td>
                        <img
                          width="75"
                          src="https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"
                          alt={`${c?.name}`}
                        />
                      </td>
                      {/* <td>
                        <div className="dropdown">
                          <button
                            type="button"
                            className="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu">
                            <button
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#editCategoryModal"
                              onClick={() => setCategoryId(c.id)}
                            >
                              <i className="bx bx-edit-alt me-1"></i>{" "}
                              Редактировать
                            </button>
                            <button
                              onClick={() => setCategoryId(c.id)}
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteCategoryModal"
                            >
                              <i className="bx bx-trash me-1"></i> Удалить
                            </button>
                          </div>
                        </div>
                      </td> */}
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
                onPageChange={handlePageClick}
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
    </div>
  );
}

export default Orders;
