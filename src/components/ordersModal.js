import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import Loader from "./loader.js";
import ReactPaginate from "react-paginate";

export const OrderModal = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/branches/products/${id}?page=${currentPage}&limit=${itemsPerPage}`
      );

      setItemsPerPage(10);
      setTotalPages(res.data.pagenation.totalPages);
      setCurrentItems(res?.data?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(`Error in fetching product: ${err}`);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e?.selected + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);
  return (
    <div
      className="modal fade"
      id="addProductModal"
      tabIndex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Orders Products
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-header row">
                <h5 className="col">Товары</h5>
                <div className="col d-flex justify-content-end">
                  <button
                    className="btn"
                    type="button"
                    title={`Перезагрузить`}
                    onClick={() => fetchProducts()}
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
                  {!currentItems.length && (
                    <div className={"w-100 d-flex justify-content-center"}>
                      <p className="text-center">Информация не найдена...</p>
                    </div>
                  )}
                  {currentItems.length ? (
                    <>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Изобрежание</th>
                            <th>Цена</th>
                            {/* <th>Категория</th> */}
                            {/* <th>Размер</th> */}
                            {/* <th>Цвет</th> */}
                            <th>Описание</th>
                            <th>Действии</th>
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                          {currentItems?.map((p, idx) => {
                            const curr =
                              currentPage === 1
                                ? currentPage + idx
                                : currentPage * itemsPerPage -
                                  (itemsPerPage - 1) +
                                  idx;
                            return (
                              <tr key={p._id}>
                                <td>{curr}</td>
                                <td>{p.product.name}</td>
                                <td>
                                  <img
                                    width="75"
                                    src={
                                      p.product.image?.includes("http")
                                        ? p.product.image
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNf0nvvXE7AVsg2EiONsgZoJS779DTMi89zw&usqp=CAU"
                                    }
                                    alt="coke"
                                  />
                                </td>
                                <td>{p.product.price} UZS</td>
                                {/* <td>
                            <span className="badge bg-label-dark me-1 px-2 py-1">
                              {p?.categoryId?.name}
                            </span>
                          </td> */}
                                {/* <td>
                            {p.size?.map((s, idx) => (
                              <span
                                key={idx}
                                className="text-danger fw-bold text-uppercase me-1"
                              >
                                {s}
                                {p.size.length - 1 === idx ? "" : ","}
                              </span>
                            ))}
                          </td> */}
                                {/* <td>
                          {p.color?.map((c, idx) => (
                            <div key={idx} className="badge bg-label-info me-1">
                              {c}
                            </div>
                          ))}
                        </td> */}
                                <td>{p.product.description}</td>
                                <td>
                                  <div className="dropdown">
                                    <button
                                      type="button"
                                      className="btn p-0 dropdown-toggle hide-arrow"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu"></div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    ""
                  )}
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
        </div>
      </div>
      {/* <Toast toggle={toggle} setToggle={setToggle} data={toastData} /> */}
    </div>
  );
};
