import React from "react";
import { useEffect, useState } from "react";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../logo.svg";
import dayjs from "dayjs";
import axios from "axios";

import relativeTime from "dayjs/plugin/relativeTime";
import Agent from "../../pages/Agent";

dayjs.extend(relativeTime);

export default function UserCard({ user }) {
  const [count, setCount] = useState(0);
  const [isrendered, setisrendered] = useState(false);

  return (
    <>
      <div className="col-lg-4 p-4 gx-4 gy-4">
        <Link className="link" to={`/agent/${user?.firstName}`}>
          {/* <Badge.Ribbon text={`${count} listings`}> */}
          <div className="card hoverable shadow">
            <img
              src={user?.photo ?? Logo}
              alt={user?.email}
              style={{ height: "250px", objectFit: "cover" }}
            />

            <div className="card-body">
              <h3>{user?.firstName ?? user?.email}</h3>
              <h5>{user?.email ?? ""}</h5>
            </div>
          </div>
          {/* </Badge.Ribbon> */}
        </Link>
      </div>
      {/* {isrendered && <Agent user={user} />} */}
    </>
  );
}
