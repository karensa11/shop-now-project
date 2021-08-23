import React, {useEffect} from "react";
import "./search-results-page.scss";
import {connect} from "react-redux";
import LayoutWithHeader from "../../layout/layout-with-header/layout-with-header";
import {createStructuredSelector} from "reselect";
import {searchResultsSelector} from "../../../redux/catalog/catalog-selector";
import * as actions from "../../../server/actions";
import {extractQueryParam} from "../../../util/navigation";
import SearchResultItem from "../../search-result-item/search-result-item";

function SearchResultsPage({searchResults, fetchSearchResults, location}) {
    const searchString = extractQueryParam(location, "q");
    useEffect(() => {
        fetchSearchResults(searchString);
    }, [fetchSearchResults, searchString]);
    return (
        <LayoutWithHeader>
            <div className="search-results-page">
                {searchResults && searchResults.length  ?
                    <div className="table">
                        <div className="results-count-header">
                            Showing results for <span className="results-count">"{searchString}"</span>
                        </div>
                        {searchResults.map(item => (
                            <SearchResultItem item={item} key={item.id} />
                        ))}
                    </div>
                    :
                    <div>No results found</div>
                }
            </div>
        </LayoutWithHeader>
    )
}

const mapStateToProps = createStructuredSelector({
    searchResults: searchResultsSelector
});

const mapDispatchToProps = (dispatch) => ({
    fetchSearchResults: (searchString) => dispatch(actions.searchItems(searchString))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage);
