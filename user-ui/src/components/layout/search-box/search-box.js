import React, {useState} from "react";
import "./search-box.scss";
import appIcons from "../../../util/applicationIcons";
import * as navigation from "../../../util/navigation";
import {useHistory} from "react-router-dom";

export default function SearchBox() {
    const history = useHistory();
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
            <input type="text" size="50" placeholder="Search..." onChange={searchStringChanged} id="searchInput" />
            <span onClick={navigateToSearchResults} id="searchBtn"><img src={appIcons.searchIcon} alt=""  /></span>
        </div>
    )
}
