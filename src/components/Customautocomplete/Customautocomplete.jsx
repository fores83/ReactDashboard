import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

var renderSuggestion = (suggestionProps) => {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const renderInput = (inputProps) => {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};
 
export default class Customautocomplete extends React.Component {
  state = {
    
  };
  render() {
    const getSuggestions = (value, { showEmpty = false } = {}) => {
      const inputValue = deburr(value.trim()).toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;
    
      return inputLength === 0 && !showEmpty
        ? []
        : this.props.suggestions.filter(suggestion => {
            const keep =
              count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
    
            if (keep) {
              count += 1;
            }
    
            return keep;
          });
    }

    const useStyles = withStyles(theme => ({
      root: {
        flexGrow: 1,
        height: 250,
      },
      container: {
        flexGrow: 1,
        position: 'relative',
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
      },
      chip: {
        margin: theme.spacing(0.5, 0.25),
      },
      inputRoot: {
        flexWrap: 'wrap',
      },
      inputInput: {
        width: '500px!important',
        flexGrow: 1,
      },
      divider: {
        height: theme.spacing(2),
      },
    }));
    const classes = useStyles;
    return (
      <div className={classes.root}>
        <Downshift onChange={this.props.onChange} id="downshift-options" initialInputValue = {this.props.initialInputValue}>
          {({
            clearSelection,
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            openMenu,
            selectedItem,
          }) => {
            const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
              // onChange: event => {
              //   if (event.target.value === '') {
              //     clearSelection();
              //   }
              // },
              onFocus: openMenu,
              placeholder: 'With the clear & show empty options',
            });

            return (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  label: this.props.title,
                  InputLabelProps: getLabelProps({ shrink: true }),
                  InputProps: { onBlur, onChange, onFocus },
                  inputProps,
                })}

                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue, { showEmpty: true }).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}
