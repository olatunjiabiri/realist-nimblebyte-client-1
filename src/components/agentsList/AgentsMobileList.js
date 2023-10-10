import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useAgent } from "../../context/agent";

import "./AgentsList.css";

import { DataGrid } from "@mui/x-data-grid";

const AgentsMobileList = ({ returnedAgents }) => {
  const [agent, setAgent] = useAgent();
  setAgent(returnedAgents);

  useEffect(() => {});

  console.log("returnedAgents>>", returnedAgents);

  const userColumns = [
    {
      field: "userId",
      headerName: "",
      headerClassName: "datatableTitle",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="agent-image">
            <Link
              className="link"
              to={{
                pathname: `/agent/${params.row?.userId}`,
                state: params.row.userId,
              }}
            >
              <img
                className="cellImg"
                src={params.row.photo ?? "nimblelogo2.png"}
                alt="avatar"
              />
            </Link>
          </div>
        );
      },
    },
    {
      field: "firstName",
      headerName: "Agent",
      headerClassName: "datatableTitle",
      width: 200,
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
                {params.row.firstName}, &nbsp; {params.row.lastName}
              </p>

              <p className="agent-text2">{params.row.company ?? "#Company"}</p>
              <p className="agent-text2">
                {params.row.phone ?? "#PhoneNumber"}
              </p>
              <p className="agent-text2">
                {params.row.licenceNumber ?? "#licence No."}
              </p>
              <p className="agent-text2">{params.row.email}</p>
            </Link>
          </div>
        );
      },
    },

    {
      field: "more",
      headerName: " ",
      width: 50,
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
          rowSpacing={3}
          // sx={{ p: 3 }}
          getRowId={(row) => row.userId}
          className="datagrid"
          rows={returnedAgents}
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
    </>
  );
};

export default AgentsMobileList;
