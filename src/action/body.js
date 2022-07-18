export const addbody = (id, body, discription, projectId, select, status) => {
  return {
    type: "ADDBODY",
    payload: {
      id: id,
      body: body,
      discription: discription,
      projectId: projectId,
      select: select,
      status: status,
    },
  };
};

export const removebody = (id) => {
  return {
    type: "REMOVEBODY",
    payload: {
      id: id,
    },
  };
};

export const bodyChange = (string) => {
  console.log("string22", string);
  return {
    type: "CHANGE-BODY",
    payload: {
      string: string,
    },
  };
};
export const discriptionChange = (string) => {
  return {
    type: "CHANGE-DISCRIPTION",
    payload: {
      string: string,
    },
  };
};

export const selectChange = (string) => {
  return {
    type: "CHANGE-SELECT",
    payload: {
      string: string,
    },
  };
};
export const statusChange = (string) => {
  console.log("string", string);
  return {
    type: "CHANGE-STATUS",
    payload: {
      status: string,
    },
  };
};
