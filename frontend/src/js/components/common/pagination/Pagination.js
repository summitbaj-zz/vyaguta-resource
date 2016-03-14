;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var ReactDOM = require('react-dom');

    var Pagination = React.createClass({

        getDefaultProps: function(){
            return {
                selectedPage: 1,
                prevClass: 'fa fa-chevron-left',
                nextClass: 'fa fa-chevron-right'
            }
        },

        componentDidMount: function(){
            if($(ReactDOM.findDOMNode(this)).find('li').length > 2){
                $(ReactDOM.findDOMNode(this))
                    .find('li:eq('+this.props.selectedPage+')').addClass('active');
            }
            this.setRange();
        },

        setDefaultActive: function(){
            if($(ReactDOM.findDOMNode(this)).find('li').length > 2){
                $(ReactDOM.findDOMNode(this))
                    .find('li:eq('+this.props.selectedPage+')').addClass('active');
            }
        },

        setRange: function(){
            var totalLi = this.props.maxPages + 2;
            $(ReactDOM.findDOMNode(this)).find('li').hide();
            $(ReactDOM.findDOMNode(this)).find('li:eq('+0+')').show();
            $(ReactDOM.findDOMNode(this)).find('li:eq('+totalLi+')').show();
            if (this.props.maxPages > this.props.range){
                for (var i= 1; i <= parseInt(this.props.range/2); i++){
                    $(ReactDOM.findDOMNode(this)).find('li:eq('+i+')').show();
                    $(ReactDOM.findDOMNode(this)).find('li:eq('+(totalLi - i) +')').show();
                }
            }
        },

        onPageChange: function (e) {
            $(ReactDOM.findDOMNode(this))
                .find('li').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.props.refreshList($(e.currentTarget).index());
        },

        prevPageClick: function(){
            var currentPage = $(ReactDOM.findDOMNode(this)).find('li.active');
            var prevPage = currentPage.prev('li');
            if(prevPage.length !=0 && prevPage.index() >= 1) {
                this.props.refreshList(prevPage.index());
                currentPage.removeClass('active');
                prevPage.addClass('active');
            }
        },

        nextPageClick: function(){
            var currentPage =  $(ReactDOM.findDOMNode(this)).find('li.active');
            var nextPage = currentPage.next('li');
            if(nextPage.length != 0 &&nextPage.index() <= this.props.maxPages){
                this.props.refreshList(nextPage.index());
                currentPage.removeClass('active');
                nextPage.addClass('active');
            }
        },

        insertPageLinks: function () {
            var liElements = [];
            liElements.push(
                <li key="prev" onClick={this.prevPageClick}>
                    <span><i className={this.props.prevClass}></i></span>
                </li>
            );
            for (var i = 1; i <= this.props.maxPages; i++) {
                liElements.push(
                    <li key={i} onClick={this.onPageChange}>
                        <span>{i}</span>
                    </li>
                );
            }
            liElements.push(
                <li key="next" onClick={this.nextPageClick}>
                    <span><i className={this.props.nextClass}></i></span>
                </li>
            );

            return liElements
        },

        render: function () {
            return (
                <div className="pagination-wrap clearfix">
                    <ul className="pagination">{this.insertPageLinks()}</ul>
                </div>
            );
        }
    });


    module.exports = Pagination;

})();