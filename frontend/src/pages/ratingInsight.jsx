import React, { useState, useEffect } from 'react';
import BarChart from '../components/global/barChart';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FavoritesTable from './favoritesTable';
import RatingsTable from './ratingsTable';

const RatingInsight = ({ title, data, maxCount }) => {
  const [chartData, setChartData] = useState(null)
  const [foodData, setFoodData] = useState([]);
  const [foodDataShow, setFoodDataShow] = useState([]);

  const [dropdownViewOptions, setDropdownViewOptions] = useState(maxCount ? ["Table View","Graph View"] :  ["Table View","Graph View", "Compare"]);

  const [dropdownViewOpen, setDropdownViewOpen] = useState(false);
  const [selectedViewOption, setSelectedViewOption] = useState("Table View"); 

  const [dropdownFilterOpen, setDropdownFilterOpen] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState("Ascending Order"); 

  const toggleViewDropdown = () => setDropdownViewOpen(prevState => !prevState);
  const toggleFilterDropdown = () => setDropdownFilterOpen(prevState => !prevState);

  const setChartDataHandler = (data) => {
    const objData = maxCount ? {
      labels: data.map(item => item.name), // X-axis labels (food item names)
      datasets: [
        {
          label: 'Favorites', // Label for the dataset
          data: data.map(item => item.count), // Y-axis data (ratings)
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }
    : {
      labels: data.map(item => item.name), // X-axis labels (food item names)
      datasets: [
        {
          label: 'Ratings', // Label for the dataset
          data: data.map(item => item.rating), // Y-axis data (ratings)
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }
    setFoodData(data)
    setFoodDataShow(data)
    setChartData(objData)
  }

  useEffect(() => {
    if(data){
      setChartDataHandler(data)
    }
  }, [data])

  const handleViews = (viewName) => {
    setSelectedFilterOption("Ascending Order")
    setSelectedViewOption(viewName);
    setChartDataHandler(data)
    if(viewName == "Graph View" && !maxCount){
      setSelectedFilterOption("Pick Popular")
    }
  };

  const sortByMostRecentFavorited = (sortData) => {
    return [sortData[sortData.length-1]];
  };

  const sortByRatingDesc = (sortData) => {
    if(maxCount){
      return sortData.slice().sort((a, b) => b.count - a.count);
    }
    return sortData.slice().sort((a, b) => b.rating - a.rating);

  };

  const sortByRatingAsc = (sortData) => {
    if(maxCount){
      return sortData.slice().sort((a, b) => a.count - b.count);
    }
    return sortData.slice().sort((a, b) => a.rating - b.rating);
  };

  const pickPopular = (sortData) => {
    const sorted = sortData.slice().sort((a, b) => b.rating - a.rating);
    const slicedData = sorted.slice(0,5)
    setChartDataHandler(slicedData)
  };

  const pickLeast = (sortData) => {
    const sorted = sortData.slice().sort((a, b) => a.rating - b.rating);
    const slicedData = sorted.slice(0,5)
    setChartDataHandler(slicedData)
  };

  const sortData = (sortData, sortBy) => {
      switch (sortBy) {
          case 'mostRecent':
              return sortByMostRecentFavorited(sortData);
          case 'ratingDesc':
              return sortByRatingDesc(sortData);
          case 'ratingAsc':
              return sortByRatingAsc(sortData);
          case 'mostPopular':
            return pickPopular(sortData);
          case 'leastPopular':
            return pickLeast(sortData);
          default:
              return data;
      }
  };

  // Handle sorting action
  const handleSort = (sortBy, sortName) => {
    setFoodDataShow([])
    setSelectedFilterOption(sortName);
    setFoodDataShow(sortData(foodData, sortBy));
  };

  return (
    <div>
      <h2 className='ml-2'>{title}</h2>
      <div className="d-flex justify-content-end mb-3">
        {selectedViewOption == "Table View" &&
          <Dropdown className='mx-2' isOpen={dropdownFilterOpen} toggle={toggleFilterDropdown}>
            <DropdownToggle caret className="bg-orange text-white">
                {selectedFilterOption}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleSort("mostRecent", "Most Recent")}>Most Recent</DropdownItem>
              <DropdownItem onClick={() => handleSort("ratingDesc", "Descending Order")}>Descending Order</DropdownItem>
              <DropdownItem onClick={() => handleSort("ratingAsc", "Ascending Order")}>Ascending Order</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        {selectedViewOption == "Graph View" && !maxCount &&
          <Dropdown className='mx-2' isOpen={dropdownFilterOpen} toggle={toggleFilterDropdown}>
            <DropdownToggle caret className="bg-orange text-white">
                {selectedFilterOption}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleSort("mostPopular", "Most Popular")}>Most Popular</DropdownItem>
              <DropdownItem onClick={() => handleSort("leastPopular", "Least Popular")}>Least Popular</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        <Dropdown isOpen={dropdownViewOpen} toggle={toggleViewDropdown}>
            <DropdownToggle caret className="bg-orange text-white">
                {selectedViewOption}
            </DropdownToggle>
            <DropdownMenu>
              {dropdownViewOptions.map((options, index) => 
                <>
                  <DropdownItem onClick={() => handleViews(options)}>{options}</DropdownItem>
                </>
              )}
            </DropdownMenu>
        </Dropdown>
      </div>
      <div style={{ width: '80%', margin: '0 auto', height: "100vh" }}>
        {foodDataShow && maxCount && selectedViewOption == "Table View" &&
          <FavoritesTable data={foodDataShow}/>
        }
        {foodDataShow && !maxCount && selectedViewOption == "Table View" &&
          <RatingsTable data={foodDataShow}/>
        }
        {chartData && selectedViewOption !== "Table View" && <BarChart 
            chartData={chartData}
            min={0}
            max={maxCount? maxCount : 6}
            title={maxCount? "Favorite by Food Item" : 'Favorite Ratings by Food Item'}
            yTitle={maxCount? "Favorite" : 'Ratings'}
            xTitle={'Food Items'}
        />}
      </div>
    </div>
  );
};

export default RatingInsight;
