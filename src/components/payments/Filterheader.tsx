import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AddFilterDropdown,
  AddFilterButton,
} from '@/components/payments/FilterSection';

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#5545fa',
        },
      },
    },
  },
});

interface FilterItem {
  label: string;
}

interface FilterHeaderProps {
  items: FilterItem[];
  onTabClick: (index: number, item: any) => void;
  activeTabIndex: number;
  showDateButton: any;
  dateButtonVisible: any;
  toggleShowDateFilter: any;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  items,
  onTabClick,
  activeTabIndex,
  showDateButton,
  dateButtonVisible,
  toggleShowDateFilter,
}) => {

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabClick(newValue, items[newValue]);
  };

  return (
    <div className='status-tab-container'>
      <ThemeProvider theme={theme}>
        <Tabs
          value={activeTabIndex} onChange={handleChange} aria-label="filter tabs">
          {items.map((item, index) => (
            <Tab 
            classes={{ root: 'myTabRoot', selected: 'myTabSelected' }}
            label={item.label} 
            key={index} />
          ))}
        </Tabs>
      </ThemeProvider>
      <div className="">
        <div className="">
          <AddFilterButton showDateButton={showDateButton} />
          {dateButtonVisible && (
            <AddFilterDropdown toggleShowDateFilter={toggleShowDateFilter} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
