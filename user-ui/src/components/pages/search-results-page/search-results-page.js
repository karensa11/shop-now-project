import React, {useEffect} from "react";
import "./search-results-page.scss";
import {connect, useDispatch, useSelector} from "react-redux";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import {createStructuredSelector} from "reselect";
import {searchResultsSelector} from "../../../redux/catalog/catalog-selector";
import * as actions from "../../../server/actions";
import {extractQueryParam} from "../../../util/navigation";
import SearchResultItem from "../../search-result-item/search-result-item";

function SearchResultsPage({location}) {
    const searchString = extractQueryParam(location, "q");
    const dispatch = useDispatch();
    const searchResults = useSelector(searchResultsSelector);
    const fetchSearchResults = () => {
        dispatch(actions.searchItems(searchString));
    };
    useEffect(() => {
        fetchSearchResults(searchString);
    }, [searchString]);
    return (
        <LayoutWithHeader>
            <div className="search-results-page">
                {searchResults && searchResults.length  ?
                    <div className="table">
                        <div className="results-count-header">
                            Showing <span id="searchResultsCountLbl">{searchResults.length}</span>&nbsp;
                            results for <span className="results-count">"<span id="searchTextLbl">{searchString}</span>"</span>
                        </div>
                        {searchResults.map((item, index) => (
                            <SearchResultItem item={item} key={item.id} index={index} />
                        ))}
                    </div>
                    :
                    <div>No results found</div>
                }
            </div>
        </LayoutWithHeader>
    )
}

export default SearchResultsPage;
