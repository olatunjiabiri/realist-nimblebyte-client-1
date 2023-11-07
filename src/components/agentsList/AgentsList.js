import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import "./AgentsList.css";

import { DataGrid } from "@mui/x-data-grid";

const AgentsList = ({ returnedAgents }) => {
  // console.log("returnedAgents", returnedAgents);
  useEffect(() => {});

  const userColumns = [
    {
      field: "userId",
      headerName: "",
      headerClassName: "datatableTitle",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="agent-image">
            <img
              className="cellImg"
              src={params.row.applicationUser.photo ?? "nimblelogo2.png"}
              alt="avatar"
            />
            {/* <p className="agent-text2">{params.row.company ?? "#Company"}</p>
            <p className="agent-text2">{params.row.phone ?? "#PhoneNumber"}</p>
            <p className="agent-text2">
              {params.row.licenceNumber ?? "#licence No."}
            </p> */}
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "Agent",
      headerClassName: "datatableTitle",
      width: 300,
      className: "table-heading",
      renderCell: (params) => {
        return (
          <div className="">
            <Link
              className="link"
              to={{
                pathname: `/agent/${params.row?.userId}`,
                state: params.row.userId,
              }}
            >
              <p className="agent-text1">
                {params.row.applicationUser.firstName}, &nbsp;{" "}
                {params.row.applicationUser.lastName}
              </p>
            </Link>

            <p className="agent-text2">
              {params.row.applicationUser.company ?? "#Company"}
            </p>
            <p className="agent-text2">
              {params.row.applicationUser.phone ?? "#PhoneNumber"}
            </p>
            <p className="agent-text2">
              {params.row.registrationNumber ?? "#licence No."}
            </p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "datatableTitle",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="table-item">{params.row.applicationUser.email}</div>
        );
      },
    },

    {
      field: "location",
      headerName: "Location",
      headerClassName: "datatableTitle",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="table-item">{params.row.applicationUser.address}</div>
        );
      },
    },
    {
      field: "more",
      headerName: " ",
      width: 100,
      renderCell: (params) => {
        return (
          <Link
            className="link"
            to={{
              pathname: `/agent/${params.row?.userId}`,
              state: params.row.userId,
            }}
          >
            <span className="more-details-button">
              <FiChevronRight />
            </span>
          </Link>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable datatableTitle">
        <DataGrid
          autoHeight
          {...returnedAgents}
          rowSpacing={5}
          // sx={{ p: 3 }}
          getRowId={(row) => row.userId}
          className="datagrid"
          rows={returnedAgents}
          columns={userColumns}
          // rowHeight={200}
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
      {/* <pre>{JSON.stringify(returnedAgents, null, 4)} </pre> */}
    </>
  );
};

export default AgentsList;
