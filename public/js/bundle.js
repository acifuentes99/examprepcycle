(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *	Searchable Table
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *	Author: Jean-Pierre Sierens
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               *	===========================================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var SearchableTable = function (_React$Component) {
	_inherits(SearchableTable, _React$Component);

	function SearchableTable() {
		_classCallCheck(this, SearchableTable);

		// Initial state of the component

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchableTable).call(this));

		_this.state = { filterText: '' };
		return _this;
	}

	_createClass(SearchableTable, [{
		key: 'handleUserInput',
		value: function handleUserInput(filterText) {
			// When there's a change in the state, the component and all its
			// sub-components get updated.
			this.setState({ filterText: filterText });
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(SearchBar, {
					filterText: this.state.filterText,
					onUserInput: this.handleUserInput.bind(this)
				}),
				_react2.default.createElement(Table, {
					data: this.props.data,
					filterText: this.state.filterText
				}),
				_react2.default.createElement(
					'p',
					null,
					'Soy un parafo csm'
				),
				_react2.default.createElement('div', { id: 'asd' })
			);
		}
	}]);

	return SearchableTable;
}(_react2.default.Component);

exports.default = SearchableTable;

var SearchBar = function (_React$Component2) {
	_inherits(SearchBar, _React$Component2);

	function SearchBar() {
		_classCallCheck(this, SearchBar);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SearchBar).apply(this, arguments));
	}

	_createClass(SearchBar, [{
		key: 'handleChange',
		value: function handleChange() {
			// passing filter data up by using a callback
			this.props.onUserInput(
			// ref is like the id
			this.refs.filterTextInput.value);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'form',
				null,
				_react2.default.createElement('input', {
					type: 'text',
					placeholder: 'Search for one keyword...',
					ref: 'filterTextInput',
					value: this.props.filterText,
					onChange: this.handleChange.bind(this)
				})
			);
		}
	}]);

	return SearchBar;
}(_react2.default.Component);

var Table = function (_React$Component3) {
	_inherits(Table, _React$Component3);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	}

	_createClass(Table, [{
		key: 'render',
		value: function render() {
			var sections = [];
			var data = this.props.data;
			data.forEach(function (product) {
				if (product.name.indexOf(this.props.filterText) === -1) {
					return;
				}
				sections.push(_react2.default.createElement(Section, { key: product.name, data: product }));
			}.bind(this));
			return _react2.default.createElement(
				'div',
				null,
				sections
			);
		}
	}]);

	return Table;
}(_react2.default.Component);

var Section = function (_React$Component4) {
	_inherits(Section, _React$Component4);

	function Section() {
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
	}

	_createClass(Section, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					null,
					this.props.data.name,
					' = ',
					this.props.data.price,
					' '
				)
			);
		}
	}]);

	return Section;
}(_react2.default.Component);

},{"react":"react"}],2:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SearchableTable = require('./SearchableTable');

var _SearchableTable2 = _interopRequireDefault(_SearchableTable);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Filterable CheatSheet Component
_reactDom2.default.render(_react2.default.createElement(_SearchableTable2.default, { data: _data.data }), document.getElementById('searchableTable'));

},{"./SearchableTable":1,"./data":3,"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var data = exports.data = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 6" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 8" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 9" }];

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanN4L1NlYXJjaGFibGVUYWJsZS5qcyIsImFwcC9qc3gvYmFzZS5qcyIsImFwcC9qc3gvZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDTUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsZTs7O0FBQ3BCLDRCQUFjO0FBQUE7Ozs7QUFBQTs7QUFHUCxRQUFLLEtBQUwsR0FBYSxFQUFDLFlBQVksRUFBYixFQUFiO0FBSE87QUFJVjs7OztrQ0FDZSxVLEVBQVk7OztBQUd4QixRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQVksVUFBYixFQUFkO0FBQ0g7OzsyQkFDSTtBQUNQLFVBQ0M7QUFBQTtJQUFBO0lBQ0MsOEJBQUMsU0FBRDtBQUNDLGlCQUFZLEtBQUssS0FBTCxDQUFXLFVBRHhCO0FBRWdCLGtCQUFhLEtBQUssZUFBTCxDQUFxQixJQUFyQixDQUEwQixJQUExQjtBQUY3QixNQUREO0lBS0MsOEJBQUMsS0FBRDtBQUNDLFdBQU0sS0FBSyxLQUFMLENBQVcsSUFEbEI7QUFFQyxpQkFBWSxLQUFLLEtBQUwsQ0FBVztBQUZ4QixNQUxEO0lBVVM7QUFBQTtLQUFBO0tBQUE7QUFBQSxLQVZUO0lBV1MsdUNBQUssSUFBRyxLQUFSO0FBWFQsSUFERDtBQWVBOzs7O0VBM0IyQyxnQkFBTSxTOztrQkFBOUIsZTs7SUE4QmYsUzs7Ozs7Ozs7Ozs7aUNBQ1U7O0FBRVIsUUFBSyxLQUFMLENBQVcsV0FBWDs7QUFFSSxRQUFLLElBQUwsQ0FBVSxlQUFWLENBQTBCLEtBRjlCO0FBSUg7OzsyQkFDSTtBQUNQLFVBQ1U7QUFBQTtJQUFBO0lBQ0k7QUFDQyxXQUFLLE1BRE47QUFFQyxrQkFBWSwyQkFGYjtBQUdDLFVBQUksaUJBSEw7QUFJQyxZQUFRLEtBQUssS0FBTCxDQUFXLFVBSnBCO0FBS0MsZUFBVyxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBdUIsSUFBdkI7QUFMWjtBQURKLElBRFY7QUFXQTs7OztFQXBCc0IsZ0JBQU0sUzs7SUF1QnhCLEs7Ozs7Ozs7Ozs7OzJCQUNHO0FBQ1AsT0FBSSxXQUFXLEVBQWY7QUFDQSxPQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBdEI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxVQUFTLE9BQVQsRUFBaUI7QUFDN0IsUUFBSSxRQUFRLElBQVIsQ0FBYSxPQUFiLENBQXFCLEtBQUssS0FBTCxDQUFXLFVBQWhDLE1BQWdELENBQUMsQ0FBckQsRUFBd0Q7QUFDdkQ7QUFDQTtBQUNELGFBQVMsSUFBVCxDQUFjLDhCQUFDLE9BQUQsSUFBUyxLQUFLLFFBQVEsSUFBdEIsRUFBNEIsTUFBTSxPQUFsQyxHQUFkO0FBQ0EsSUFMWSxDQUtYLElBTFcsQ0FLTixJQUxNLENBQWI7QUFNQSxVQUNDO0FBQUE7SUFBQTtJQUFNO0FBQU4sSUFERDtBQUdBOzs7O0VBYmtCLGdCQUFNLFM7O0lBZ0JwQixPOzs7Ozs7Ozs7OzsyQkFDRztBQUNQLFVBQ0M7QUFBQTtJQUFBO0lBQ0M7QUFBQTtLQUFBO0tBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFwQjtLQUFBO0tBQTZCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsS0FBN0M7S0FBQTtBQUFBO0FBREQsSUFERDtBQUtBOzs7O0VBUG9CLGdCQUFNLFM7Ozs7O0FDN0U1Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7QUFHQSxtQkFBUyxNQUFULENBQWlCLDJEQUFpQixnQkFBakIsR0FBakIsRUFBaUQsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUFqRDs7Ozs7Ozs7QUNOTyxJQUFNLHNCQUFPLENBQ2xCLEVBQUMsVUFBVSxnQkFBWCxFQUE2QixPQUFPLFFBQXBDLEVBQThDLFNBQVMsSUFBdkQsRUFBNkQsTUFBTSxVQUFuRSxFQURrQixFQUVsQixFQUFDLFVBQVUsZ0JBQVgsRUFBNkIsT0FBTyxPQUFwQyxFQUE2QyxTQUFTLElBQXRELEVBQTRELE1BQU0sVUFBbEUsRUFGa0IsRUFHbEIsRUFBQyxVQUFVLGdCQUFYLEVBQTZCLE9BQU8sUUFBcEMsRUFBOEMsU0FBUyxLQUF2RCxFQUE4RCxNQUFNLFlBQXBFLEVBSGtCLEVBSWxCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sUUFBakMsRUFBMkMsU0FBUyxJQUFwRCxFQUEwRCxNQUFNLFlBQWhFLEVBSmtCLEVBS2xCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sU0FBakMsRUFBNEMsU0FBUyxLQUFyRCxFQUE0RCxNQUFNLFVBQWxFLEVBTGtCLEVBTWxCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sU0FBakMsRUFBNEMsU0FBUyxLQUFyRCxFQUE0RCxNQUFNLFVBQWxFLEVBTmtCLEVBT2xCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sU0FBakMsRUFBNEMsU0FBUyxJQUFyRCxFQUEyRCxNQUFNLFNBQWpFLEVBUGtCLEdBUWxCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sU0FBakMsRUFBNEMsU0FBUyxJQUFyRCxFQUEyRCxNQUFNLFNBQWpFLEVBUmtCLEVBU2xCLEVBQUMsVUFBVSxhQUFYLEVBQTBCLE9BQU8sU0FBakMsRUFBNEMsU0FBUyxJQUFyRCxFQUEyRCxNQUFNLFNBQWpFLEVBVGtCLENBQWIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbipcdFNlYXJjaGFibGUgVGFibGVcbipcdEF1dGhvcjogSmVhbi1QaWVycmUgU2llcmVuc1xuKlx0PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hhYmxlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdC8vIEluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgICAgICB0aGlzLnN0YXRlID0ge2ZpbHRlclRleHQ6ICcnfVxuICAgIH1cbiAgICBoYW5kbGVVc2VySW5wdXQoZmlsdGVyVGV4dCkge1xuICAgIFx0Ly8gV2hlbiB0aGVyZSdzIGEgY2hhbmdlIGluIHRoZSBzdGF0ZSwgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBcbiAgICBcdC8vIHN1Yi1jb21wb25lbnRzIGdldCB1cGRhdGVkLlxuICAgICAgICB0aGlzLnNldFN0YXRlKHtmaWx0ZXJUZXh0OiBmaWx0ZXJUZXh0fSk7XG4gICAgfVxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PFNlYXJjaEJhciBcblx0XHRcdFx0XHRmaWx0ZXJUZXh0PXt0aGlzLnN0YXRlLmZpbHRlclRleHR9XG4gICAgICAgICAgICAgICAgICAgIG9uVXNlcklucHV0PXt0aGlzLmhhbmRsZVVzZXJJbnB1dC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG5cdFx0XHRcdDxUYWJsZSBcblx0XHRcdFx0XHRkYXRhPXt0aGlzLnByb3BzLmRhdGF9IFxuXHRcdFx0XHRcdGZpbHRlclRleHQ9e3RoaXMuc3RhdGUuZmlsdGVyVGV4dH1cblx0XHRcdFx0Lz5cblxuICAgICAgICAgICAgPHA+U295IHVuIHBhcmFmbyBjc208L3A+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiYXNkXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmNsYXNzIFNlYXJjaEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGhhbmRsZUNoYW5nZSgpIHtcblx0XHQvLyBwYXNzaW5nIGZpbHRlciBkYXRhIHVwIGJ5IHVzaW5nIGEgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5wcm9wcy5vblVzZXJJbnB1dChcbiAgICAgICAgXHQvLyByZWYgaXMgbGlrZSB0aGUgaWRcbiAgICAgICAgICAgIHRoaXMucmVmcy5maWx0ZXJUZXh0SW5wdXQudmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgXHR0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgIFx0cGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIG9uZSBrZXl3b3JkLi4uXCIgXG4gICAgICAgICAgICAgICAgXHRyZWY9XCJmaWx0ZXJUZXh0SW5wdXRcIlxuICAgICAgICAgICAgICAgIFx0dmFsdWU9IHt0aGlzLnByb3BzLmZpbHRlclRleHR9XG4gICAgICAgICAgICAgICAgXHRvbkNoYW5nZT0ge3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICk7XG5cdH1cbn1cblxuY2xhc3MgVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRyZW5kZXIoKXtcblx0XHRsZXQgc2VjdGlvbnMgPSBbXTtcblx0XHRsZXQgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcblx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24ocHJvZHVjdCl7XG5cdFx0XHRpZiAocHJvZHVjdC5uYW1lLmluZGV4T2YodGhpcy5wcm9wcy5maWx0ZXJUZXh0KSA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0c2VjdGlvbnMucHVzaCg8U2VjdGlvbiBrZXk9e3Byb2R1Y3QubmFtZX0gZGF0YT17cHJvZHVjdH0gLz4pO1xuXHRcdH0uYmluZCh0aGlzKSlcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PntzZWN0aW9uc308L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8cD57dGhpcy5wcm9wcy5kYXRhLm5hbWV9ID0ge3RoaXMucHJvcHMuZGF0YS5wcmljZX0gPC9wPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlYXJjaGFibGVUYWJsZSBmcm9tICcuL1NlYXJjaGFibGVUYWJsZSc7XG5pbXBvcnQge2RhdGF9IGZyb20gJy4vZGF0YSc7XG5cbi8vIEZpbHRlcmFibGUgQ2hlYXRTaGVldCBDb21wb25lbnRcblJlYWN0RE9NLnJlbmRlciggPFNlYXJjaGFibGVUYWJsZSBkYXRhPXtkYXRhfS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoYWJsZVRhYmxlJykgKTtcbiIsImV4cG9ydCBjb25zdCBkYXRhID0gW1xuICB7Y2F0ZWdvcnk6IFwiU3BvcnRpbmcgR29vZHNcIiwgcHJpY2U6IFwiJDQ5Ljk5XCIsIHN0b2NrZWQ6IHRydWUsIG5hbWU6IFwiRm9vdGJhbGxcIn0sXG4gIHtjYXRlZ29yeTogXCJTcG9ydGluZyBHb29kc1wiLCBwcmljZTogXCIkOS45OVwiLCBzdG9ja2VkOiB0cnVlLCBuYW1lOiBcIkJhc2ViYWxsXCJ9LFxuICB7Y2F0ZWdvcnk6IFwiU3BvcnRpbmcgR29vZHNcIiwgcHJpY2U6IFwiJDI5Ljk5XCIsIHN0b2NrZWQ6IGZhbHNlLCBuYW1lOiBcIkJhc2tldGJhbGxcIn0sXG4gIHtjYXRlZ29yeTogXCJFbGVjdHJvbmljc1wiLCBwcmljZTogXCIkOTkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJpUG9kIFRvdWNoXCJ9LFxuICB7Y2F0ZWdvcnk6IFwiRWxlY3Ryb25pY3NcIiwgcHJpY2U6IFwiJDM5OS45OVwiLCBzdG9ja2VkOiBmYWxzZSwgbmFtZTogXCJpUGhvbmUgNVwifSxcbiAge2NhdGVnb3J5OiBcIkVsZWN0cm9uaWNzXCIsIHByaWNlOiBcIiQzOTkuOTlcIiwgc3RvY2tlZDogZmFsc2UsIG5hbWU6IFwiaVBob25lIDZcIn0sXG4gIHtjYXRlZ29yeTogXCJFbGVjdHJvbmljc1wiLCBwcmljZTogXCIkMTk5Ljk5XCIsIHN0b2NrZWQ6IHRydWUsIG5hbWU6IFwiTmV4dXMgN1wifSwsXG4gIHtjYXRlZ29yeTogXCJFbGVjdHJvbmljc1wiLCBwcmljZTogXCIkMTk5Ljk5XCIsIHN0b2NrZWQ6IHRydWUsIG5hbWU6IFwiTmV4dXMgOFwifSxcbiAge2NhdGVnb3J5OiBcIkVsZWN0cm9uaWNzXCIsIHByaWNlOiBcIiQxOTkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJOZXh1cyA5XCJ9XG5dO1xuIl19
