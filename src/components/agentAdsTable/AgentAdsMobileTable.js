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

  // console.log("ads>>", ads[0]);

  const userColumns = [
    {
      field: "",
      headerName: "",
      headerClassName: "datatableTitle",
      width: 100,
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
      width: 200,
      className: "table-heading",
      renderCell: (params) => {
        return (
          <div className="">
            <Link className="link" to={`/ad/${params.row.slug}`}>
              <p className="agent-text2">{params.row.address}</p>
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
              <div className="table-item">
                {" "}
                <span>&#8358;</span>
                {millify(params.row.price)}{" "}
              </div>
              <div className="table-item">
                {params.row.sold ? <>{params.row.sold}</> : <>Available</>}
              </div>
            </Link>
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
          getRowId={(row) => row._id}
          className="datagrid"
          rows={ads[0]}
          columns={userColumns}
          // rowHeight={150}
          autoHeight
          {...ads[0]}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          sx={{
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: "8px",
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
          }}
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
