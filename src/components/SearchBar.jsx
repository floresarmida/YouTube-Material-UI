import React, {Component} from 'react'
import _ from 'lodash'
import AutoComplete from 'material-ui/AutoComplete'
import YTSearch from 'youtube-api-search'
import axios from 'axios'
import JSONP from 'jsonp'


const googleAutoSuggestURL = 'http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

// https://www.googleapis.com/youtube/v3/search

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this)
    this.state = {
      videos: [],
      autoSuggest: [],
      inputValue: '',
      selectedVideo: null
    }
  }

  // videoSearch(term) {
  //   YTSearch({
  //     key: KEY,
  //     term: term,
  //   }, (videos) => {
  //     this.setState({
  //       videos,
  //       selectedVideo: videos[0],
  //     });
  //   });
  // }

  onUpdateInput(inputValue) {
    //this.videoSearch(inputValue)
    // axios(`${googleAutoSuggestURL}${inputValue}`).then(val => console.log(val))
    const url = googleAutoSuggestURL + inputValue
    if (inputValue) {
      JSONP(url, (error, data) => this.mapAutoSuggest(data))
    }
  }

  mapAutoSuggest(items) {
    const mapped = items[1].map(item => item[0])
    this.setState({autoSuggest: mapped})
    console.log(mapped)
  }


  googleAutoSuggest() {}


  render() {
    return (
      <div>
        <AutoComplete
          floatingLabelText="Search"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.autoSuggest}
          onUpdateInput={this.onUpdateInput}
          maxSearchResults={20}
        />
      </div>
    )
  }
}

export default SearchBar