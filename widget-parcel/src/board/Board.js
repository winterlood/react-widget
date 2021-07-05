import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import { BoardProvider } from "./BoardStore";
import BoardList from "./BoardList";
import BoardNew from "./BoardNew";
import BoardDetail from "./BoardDetail";

const BoardRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={BoardList} />
                <Route path="/board/new" component={BoardNew} />
                <Route path="/board/:id" component={BoardDetail} />
                {/* <Redirect from="*" to="/" /> */}
            </Switch>
        </BrowserRouter>
    );
};
const Board = () => {
    return (
        <BoardProvider>
            <div className="Board">
                <BoardRouter />
            </div>
        </BoardProvider>
    );
};

export default Board;
