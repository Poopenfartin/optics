import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "../../Styles/App.css"

const BuildingLanding = ({}) => {
  return (
    <div>
      <h1>BIG BONNIE BALLZ</h1>

      <input
        type="text"
        className="WO-SearchBox"
        placeholder="Search for customer name..."
      />
      <Button
        variant="contained"
        color="primary"
        className="add-work-order-button"
        onClick={() => setIsAddModalOpen(true)}>
        Add New Customer
      </Button>

      <img src="https://res.cloudinary.com/teepublic/image/private/s--sxb1YRr4--/c_crop,x_10,y_10/c_fit,h_1109/c_crop,g_north_west,h_1260,w_1260,x_-86,y_-72/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-86,y_-72/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1254,w_1254/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1592977991/production/designs/11623718_0.jpg" />
    </div>
  );
};

export default BuildingLanding;
