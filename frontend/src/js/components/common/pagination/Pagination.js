;(function () {
    'use-strict';

    //React and Redux dependencies
    var React = require('react');
    var ReactDOM = require('react-dom');

    var Pagination = React.createClass({

        getDefaultProps: function(){
            return {
                selectedPage: 1,
                range: 4,
                prevClass: 'fa fa-chevron-left',
                nextClass: 'fa fa-chevron-right'
            }
        },

        componentDidUpdate: function(){
            if($(ReactDOM.findDOMNode(this)).find('li').length > 2){
                if($(ReactDOM.findDOMNode(this)).find('li.active').length === 0){
                    $(ReactDOM.findDOMNode(this))
                        .find('li:eq('+this.props.selectedPage+')').addClass('active');
                    this.setRange();
                }
            }
        },

        setDefaultActive: function(){
            if($(ReactDOM.findDOMNode(this)).find('li').length > 2){
                $(ReactDOM.findDOMNode(this))
                    .find('li:eq('+this.props.selectedPage+')').addClass('active');
            }
        },

        setRange: function(){
            var totalLi = this.props.maxPages + 1;

            if (this.props.maxPages > this.props.range){
                $(ReactDOM.findDOMNode(this)).find('li').hide();
                for (var i= 0; i <= parseInt((this.props.range/2).toFixed()); i++) {
                    $(ReactDOM.findDOMNode(this)).find('li:eq(' + i + ')').show();
                    $(ReactDOM.findDOMNode(this)).find('li:eq(' + (totalLi - i) + ')').show();
                }
                $(ReactDOM.findDOMNode(this)).find('li:eq(' + i + ')').after('<div>...</div>');
            }
        },

        onPageChange: function (e) {
            $(ReactDOM.findDOMNode(this))
                .find('li').removeClass('active');
            var currentElement = $(e.currentTarget);

            currentElement.addClass('active');
            var counter = 0;
            $(ReactDOM.findDOMNode(this))
                .find('ul.pagination div').remove();
            this.props.refreshList(currentElement.index());
            this.setVisibleOnChange(currentElement);

        },

        setDefaultVisible: function(totalLi){
            //active default
            $(ReactDOM.findDOMNode(this)).find('li:eq('+0+')').show();
            $(ReactDOM.findDOMNode(this)).find('li:eq('+totalLi +')').show();
            $(ReactDOM.findDOMNode(this)).find('li:eq('+1+')').show();
            $(ReactDOM.findDOMNode(this)).find('li:eq('+(totalLi - 1) +')').show()
        },

        prevPageClick: function(){
            var currentPage = $(ReactDOM.findDOMNode(this)).find('li.active');
            var prevPage = currentPage.prev('li');
            if(prevPage.length !=0 && prevPage.index() >= 1) {
                $(ReactDOM.findDOMNode(this))
                    .find('ul.pagination div').remove();
                this.props.refreshList(prevPage.index());
                this.setVisibleOnChange(prevPage);
                currentPage.removeClass('active');
                prevPage.addClass('active');
            }
        },

        nextPageClick: function(){
            var currentPage =  $(ReactDOM.findDOMNode(this)).find('li.active');
            var nextPage = currentPage.next('li');
            if(nextPage.length != 0 &&nextPage.index() <= this.props.maxPages){
                $(ReactDOM.findDOMNode(this))
                    .find('ul.pagination div').remove();
                this.props.refreshList(nextPage.index());
                this.setVisibleOnChange(nextPage);
                currentPage.removeClass('active');
                nextPage.addClass('active');
            }
        },

        setVisibleOnChange: function(currentElement){
            var totalLi = this.props.maxPages + 1;
            var index = currentElement.index();

            if (this.props.maxPages > this.props.range){
                $(ReactDOM.findDOMNode(this)).find('li').hide();
                this.setDefaultVisible(totalLi);
                for (var i= 0; i <= parseInt((this.props.maxPages/2).toFixed()); i++){
                    if(i===index || i === parseInt(index/2)){
                        currentElement.show();
                        if(!currentElement.is(':nth-last-child(2)') ){
                            currentElement.next('li').show();
                            currentElement.prev('li').show();
                        }
                        else{
                            currentElement.prev('li').show();
                            $(ReactDOM.findDOMNode(this)).find('li:eq('+2+')').show();
                        }
                        if(currentElement.is(':nth-last-child(3)') ){
                            $(ReactDOM.findDOMNode(this)).find('li:eq('+2+')').show();
                        }
                        if(index === 1){
                            $(ReactDOM.findDOMNode(this)).find('li:nth-last-child(3)').show();
                        }
                    }
                }
                this.addBreaks(currentElement)
            }
        },

        addBreaks: function(currentElement){
            if(currentElement.nextAll().eq(1).length > 0 && !currentElement.nextAll().eq(1).is(':visible')){
                currentElement.nextAll().eq(1).after('<div>...</div>');
            }
            if(currentElement.prevAll().eq(1).length > 0 && !currentElement.prevAll().eq(1).is(':visible')){
                currentElement.prevAll().eq(1).after('<div>...</div>');
            }
        },

        insertPageLinks: function () {
            var liElements = [];
            liElements.push(
                <li key='prev' onClick={this.prevPageClick}>
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
                <li key='next' onClick={this.nextPageClick}>
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