import React, { useState, useEffect } from "react";
import millify from "millify";

import { Link } from "react-router-dom";

import "./AgentAdsTable.css";

import { DataGrid } from "@mui/x-data-grid";

const AgentAdsTable = ({ ads }) => {
  const [agent, setAgent] = useState([]);

  useEffect(() => {
    setAgent(ads[0]);
  }, []);

  console.log("ads>>", ads[0]);

  const userColumns = [
    {
      field: "",
      headerName: "",
      headerClassName: "datatableTitle",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="agent-image">
            <img
              className="cellImg"
              src={params.row.photos[0].Location ?? "nimblelogo2.png"}
              alt="avatar"
            />
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      headerClassName: "datatableTitle",
      width: 500,
      className: "table-heading",
      renderCell: (params) => {
        return (
          <div className="">
            <Link className="link" to={`/ad/${params.row.slug}`}>
              <p className="agent-text2">{params.row.address}</p>
            </Link>
          </div>
        );
      },
    },
    {
      field: "feature",
      headerName: "Feature",
      headerClassName: "datatableTitle",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="table-item">
            <span>
              {params.row.bedrooms !== null ? (
                <>
                  {" "}
                  {`${params.row.bedrooms} bed ${params.row.bathrooms} bath ${params.row.carpark} carpark`}
                </>
              ) : (
                <>{`${params.row.landsize} landsize`}</>
              )}
              &nbsp;
            </span>
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      headerClassName: "datatableTitle",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="table-item">
            {" "}
            <span>&#8358;</span>
            {millify(params.row.price)}{" "}
          </div>
        );
      },
    },
    {
      field: "sold",
      headerName: "Status",
      headerClassName: "datatableTitle",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="table-item">
            {params.row.sold ? <>"Sold"</> : <>Available</>}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="datatable datatableTitle">
        <DataGrid
          rowSpacing={3}
          // sx={{ p: 3 }}
          getRowId={(row) => row._id}
          className="datagrid"
          rows={ads[0]}
          columns={userColumns}
          rowHeight={200}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 40]}
        />
      </div>
      {/* <pre>{JSON.stringify(agent, null, 4)} </pre> */}
    </>
  );
};

export default AgentAdsTable;
