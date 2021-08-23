import React, {useState} from "react";
import "./search-box.scss";
import appIcons from "../../../util/applicationIcons";
import * as navigation from "../../../util/navigation";
import {withRouter} from "react-router-dom";

function SearchBox({history}) {
    const [searchString, setSearchString] = useState("");
    const searchStringChanged = (event) => {
        const {value} = event.target;
        setSearchString(value);
    };
    const navigateToSearchResults = () => {
        navigation.navigateToSearchResults(history, searchString);
    };
    return (
        <div className="search-box-component">
            <input type="text" size="100" placeholder="Search..." onChange={searchStringChanged}/>
            <img src={appIcons.searchIcon} alt="" onClick={navigateToSearchResults} />
        </div>
    )
}

export default withRouter(SearchBox);
