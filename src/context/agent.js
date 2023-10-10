import React, { useState, createContext, useContext } from "react";

const AgentContext = createContext();

const AgentProvider = ({ children }) => {
  const [agent, setAgent] = useState({
    user: null,
  });

  return (
    <AgentContext.Provider value={[agent, setAgent]}>
      {children}
    </AgentContext.Provider>
  );
};

const useAgent = () => useContext(AgentContext);

export { useAgent, AgentProvider };
