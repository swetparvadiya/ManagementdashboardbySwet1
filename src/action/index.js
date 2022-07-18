export const add = (id, title) => {
  return {
    type: "ADD",
    payload: {
      id: id,
      title: title,
    },
  };
};

export const remove = (id) => {
  return {
    type: "REMOVE",
    payload: {
      id: id,
    },
  };
};

export const remove_all = () => {
  return {
    type: "REMOVE_ALL",
  };
};

export const titleChange = (string) => {
  console.log("titleChange string", string);
  return {
    type: "CHANGE-TITLE",
    payload: {
      string: string,
    },
  };
};
