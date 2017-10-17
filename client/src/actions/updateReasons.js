import React, { Component } from "react";
import API from "./axiosApi";


  const UpdateReasons = (reasons) => {
    reasons.forEach( reason => {
      API.saveReason({
        reasonList: reason
      })
      .then(res => console.log(res.reason))
      .catch(err => console.log(err));
    })
  };


export default UpdateReasons