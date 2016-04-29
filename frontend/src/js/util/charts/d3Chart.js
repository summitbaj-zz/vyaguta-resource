/**
 * Created by
 * Pratish Shrestha <pratishshrestha@lftechnology.com>
 * on 3/14/16.
 */

;(function () {

    function d3Chart() {
        //data
        var lanes;
        var items;
        var now = new Date();

        //charts
        var main;
        var mini;

        //properties
        var width;
        var height;
        var mainHeight;
        var miniHeight;
        var margin = {top: 20, right: 15, bottom: 15, left: 60};

        //scaling properites
        var x;
        var x1;
        var ext;
        var mainY;
        var miniY;

        //chart axis
        var x1MonthAxis;
        var x1DateAxis;

        var xMonthAxis;
        var xDateAxis;

        //data
        var itemRects;

        // components
        var brush;
        var tooltip;

        var parseDate = d3.time.format("%Y-%m-%d").parse;

        this.create = function (element, data) {
            lanes = data.lanes;
            items = data.items;
            width = (screen.width/1.41) - margin.left - margin.right;
            height = (lanes.length * 50) + 100;
            miniHeight = lanes.length * 12 + 50;
            mainHeight = height - miniHeight - 50;

            //render SVG
            var svg = d3.select(element)
                .append('svg:svg')
                .attr('width', width + margin.right + margin.left)
                .attr('height', height + margin.top + margin.bottom)
                .attr('class', 'chart');

            //responsive
            window.addEventListener("resize", function(e) {
                width = e.target.outerWidth/1.41 + margin.right + margin.left;
                x1 = d3.time.scale().range([0, width]);

                svg.attr("width", width);


            });

            //define clippath
            svg.append('defs')
                .append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', width)
                .attr('height', mainHeight);

            tooltip = d3.select(element)
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .attr('class', 'chart-tooltip');

            addBorder(svg, '#D3ECD2', '5');

            initializeScalingProperties();

            initializeDateAxisForMain('%d');
            initializeMonthAxisForMain('%b - Week %W');

            initializeDateAxisForMini('%d');
            initializeMonthAxisForMini('%b %Y');

            createMainChart(svg, width, mainHeight);
            createMiniChart(svg, width, miniHeight);

            display();
        };

        var addBorder = function (svg, color, strokeWidth) {
            //svg border
            svg.append('rect')
                .attr('width', width + margin.right + margin.left)
                .attr('height', height + margin.top + margin.bottom)
                .attr('class', 'chartContainer')
                .style('fill-opacity', 0)
                .style('stroke', color)
                .style('stroke-width', strokeWidth)
        };

        var initializeScalingProperties = function () {
            x = d3.time.scale().domain([d3.time.sunday(d3.min(items, function (d) {
                    return parseDate(d.start);
                })),
                    d3.max(items, function (d) {
                        return parseDate(d.end);
                    })])
                .range([0, width]);

            x1 = d3.time.scale().range([0, width]);

            //gives min and max values
            ext = d3.extent(lanes, function (d) {
                return d.id;
            });

            //mapping id and height for main chart
            mainY = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, mainHeight]);

            //mapping id and height for mini chart
            miniY = d3.scale.linear().domain([ext[0], ext[1] + 1]).range([0, miniHeight]);

            brush = d3.svg.brush()
                .x(x)
                .extent([d3.time.monday(now), d3.time.day.offset(d3.time.monday(now), 15)])
                .on("brush", display);
        };

        var initializeMonthAxisForMain = function (format) {
            x1MonthAxis = d3.svg.axis()
                .scale(x1)
                .orient('top')
                .ticks(d3.time.mondays, 1)
                .tickFormat(d3.time.format(format))
                .tickSize(15, 0, 2);
        };

        var initializeDateAxisForMain = function (format) {
            x1DateAxis = d3.svg.axis()
                .scale(x1)
                .orient('bottom')
                .ticks(d3.time.days, 1)
                .tickFormat(d3.time.format(format))
                .tickSize(6, 0, 2);
        };

        var initializeMonthAxisForMini = function (format) {
            xMonthAxis = d3.svg.axis()
                .scale(x)
                .orient('top')
                .ticks(d3.time.months, 1)
                .tickFormat(d3.time.format(format))
                .tickSize(15, 0, 0)
        };

        var initializeDateAxisForMini = function (format) {
            xDateAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .ticks(d3.time.mondays, (x.domain()[1] - x.domain()[0]) > 15552e6 ? 2 : 1)
                .tickFormat(d3.time.format(format))
                .tickSize(6, 0, 0);

        };

        var createMainChart = function (svg, width, mainHeight) {
            //group for main chart
            main = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('width', width)
                .attr('height', mainHeight)
                .attr('class', 'main');

            // draw the lanes for the main chart
            main.append('g').selectAll('.laneLines')
                .data(lanes)
                .enter().append('line')
                .attr('x1', 0)
                .attr('y1', function (d) {
                    return d3.round(mainY(d.id));
                })
                .attr('x2', width)
                .attr('y2', function (d) {
                    return d3.round(mainY(d.id));
                })
                .attr('stroke', '#CDCDCD')
                .attr('stroke-width', 2);

            //draw text
            main.append('g').selectAll('.laneText')
                .data(lanes)
                .enter().append('text')
                .text(function (d) {
                    return d.label;
                })
                .attr('x', -10)
                .attr('y', function (d) {
                    return mainY(d.id + .5);
                })
                .attr('dy', '0.5ex')
                .attr('text-anchor', 'end')
                .attr('class', 'laneText')
                .style('fill', '#394263');

            //draw date axis
            main.append('g')
                .attr('transform', 'translate(0,' + mainHeight + ')')
                .attr('class', 'main axis date')
                .call(x1DateAxis)
                .style('fill', '#394263');
            ;

            //draw month axis
            main.append('g')
                .attr('transform', 'translate(0,0.5)')
                .attr('class', 'main axis month')
                .call(x1MonthAxis)
                .selectAll('text')
                .attr('dx', 501)
                .attr('dy', 12)
                .style('fill', '#394263');

            // draw a line representing today's date
            main.append('line')
                .attr('y1', 0)
                .attr('y2', mainHeight)
                .attr('class', 'main todayLine')
                .attr('clip-path', 'url(#clip)');

            // draw the items
            itemRects = main.append('g')
                .attr('clip-path', 'url(#clip)');
        };

        var createMiniChart = function (svg, width, miniHeight) {
            //group for mini chart
            mini = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + (mainHeight + 60) + ')')
                .attr('width', width)
                .attr('height', miniHeight)
                .attr('class', 'mini');

            // draw the lanes for the mini chart
            mini.append('g').selectAll('.laneLines')
                .data(lanes)
                .enter().append('line')
                .attr('x1', 0)
                .attr('y1', function (d) {
                    return d3.round(miniY(d.id));
                })
                .attr('x2', width)
                .attr('y2', function (d) {
                    return d3.round(miniY(d.id));
                })
                .attr('stroke', '#CDCDCD');

            //text for mini lanes
            mini.append('g').selectAll('.laneText')
                .data(lanes)
                .enter().append('text')
                .text(function (d) {
                    return d.label;
                })
                .attr('x', -10)
                .attr('y', function (d) {
                    return miniY(d.id + .5);
                })
                .attr('dy', '0.5ex')
                .attr('text-anchor', 'end')
                .attr('class', 'laneText')
                .style('fill', '#394263');

            //draw date axis
            mini.append('g')
                .attr('transform', 'translate(0,' + miniHeight + ')')
                .attr('class', 'axis date')
                .call(xDateAxis)
                .style('fill', '#394263');

            //draw month axis
            mini.append('g')
                .attr('transform', 'translate(0,0.5)')
                .attr('class', 'axis month')
                .call(xMonthAxis)
                .selectAll('text')
                .attr('dx', 22)
                .attr('dy', 12)
                .style('fill', '#394263');

            // draw a line representing today's date
            mini.append('line')
                .attr('x1', x(now) + 0.5)
                .attr('y1', 0)
                .attr('x2', x(now) + 0.5)
                .attr('y2', miniHeight)
                .attr('class', 'todayLine');

            // draw the items
            mini.append('g').selectAll('miniItems')
                .data(getPaths(items))
                .enter().append('path')
                .attr('class', function (d) {
                    return 'miniItem ' + d.class;
                })
                .attr('d', function (d) {
                    return d.path;
                });

            // invisible hit area to move around the selection window
            mini.append('rect')
                .attr('pointer-events', 'painted')
                .attr('width', width)
                .attr('height', miniHeight)
                .attr('visibility', 'hidden')
                .on('mouseup', moveBrush);

            mini.append('g')
                .attr('class', 'x brush')
                .call(brush)
                .selectAll('rect')
                .attr('y', 0)
                .attr('height', miniHeight);
        };

        // generates a single path for each item class in the mini display
        // ugly - but draws mini 2x faster than append lines or line generator
        // is there a better way to do a bunch of lines as a single path with d3?
        var getPaths = function (items) {
            var paths = {}, d, offset = .5 * miniY(1) + 0.5, result = [];
            for (var i = 0; i < items.length; i++) {
                d = items[i];
                if (!paths[d.class]) paths[d.class] = '';
                paths[d.class] += ['M', x(parseDate(d.start)), (miniY(d.lane) + offset), 'H', x(parseDate(d.end))].join(' ');
            }

            for (var className in paths) {
                result.push({class: "miniItem", path: paths[className]});
            }

            return result;
        }

        var display = function () {

            var rects, labels
                , minExtent = d3.time.day(brush.extent()[0])
                , maxExtent = d3.time.day(brush.extent()[1])
                , visItems = items.filter(function (d) {
                return parseDate(d.start) < maxExtent && parseDate(d.end) > minExtent
            });

            mini.select('.brush').call(brush.extent([minExtent, maxExtent]));


            if ((maxExtent - minExtent) > 2592000000) {
                maxExtent = d3.time.month.offset(minExtent, 1);
                mini.select('.brush').call(brush.extent([minExtent, maxExtent]));
            } else if ((maxExtent - minExtent) > 1468800000) {
                x1DateAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%a %d'))
                x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))
            }
            else if ((maxExtent - minExtent) > 172800000) {
                x1DateAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%a %d'))
                x1MonthAxis.ticks(d3.time.mondays, 1).tickFormat(d3.time.format('%b - Week %W'))
            } else {
                x1DateAxis.ticks(d3.time.hours, 4).tickFormat(d3.time.format('%I %p'))
                x1MonthAxis.ticks(d3.time.days, 1).tickFormat(d3.time.format('%b %e'))
            }

            x1.domain([minExtent, maxExtent]);

            //x1Offset.range([0, x1(d3.time.day.ceil(now) - x1(d3.time.day.floor(now)))]);

            // shift the today line
            main.select('.main.todayLine')
                .attr('x1', x1(now) + 0.5)
                .attr('x2', x1(now) + 0.5);

            // update the axis
            main.select('.main.axis.date').call(x1DateAxis);

            main.select('.main.axis.month').call(x1MonthAxis)
                .selectAll('text')
                .attr('dx', 45)
                .attr('dy', 12);

            // update the item rects
            rects = itemRects.selectAll('rect')
                .data(visItems, function (d) {
                    return d.id;
                })
                .attr('x', function (d) {
                    if (x1(parseDate(d.start)) < 0) {
                        return 0;
                    }

                    return x1(parseDate(d.start));
                })
                .attr('y', function (d) {
                    return mainY(d.lane) + .1 * mainY(2.5);
                })
                .attr('width', function (d) {
                        if (x1(parseDate(d.end)) >= width && x1(parseDate(d.start)) < 0) {
                            return width;
                        } else if (x1(parseDate(d.end)) >= width) {
                            return width - x1(parseDate(d.start));
                        } else if (x1(parseDate(d.start)) < 0) {
                            return x1(parseDate(d.end));
                        }

                        return x1(parseDate(d.end)) - x1(parseDate(d.start));
                    }
                )
                .attr('class', function (d) {
                    return 'mainItem' + d.contract;
                });

            rects.enter().append('rect')
                .attr('x', function (d) {
                    if (x1(parseDate(d.start)) < 0) {
                        return 0;
                    }

                    return x1(parseDate(d.start));
                })
                .attr('y', function (d) {
                    return mainY(d.lane) + .1 * mainY(2.5);
                })
                .attr('width', function (d) {
                    if (x1(parseDate(d.end)) >= width && x1(parseDate(d.start)) < 0) {
                        return width;
                    } else if (x1(parseDate(d.end)) >= width) {
                        return width - x1(parseDate(d.start));
                    } else if (x1(parseDate(d.start)) < 0) {
                        return x1(parseDate(d.end));
                    }

                    return x1(parseDate(d.end)) - x1(parseDate(d.start));
                })
                .attr('height', function (d) {
                    return .5 * mainY(1);
                })
                .attr('class', function (d) {
                    return 'mainItem' + d.contract;
                })
                .on('mouseover', function (d) {
                    return tooltip.style("visibility", "visible").html("Role: " + (d.role && d.role.title) + "<br/>" + "Join Date: " + d.start + "<br/>" + "End Date: " + d.end)
                })
                .on("mousemove", function () {
                    return tooltip.style("top", (event.layerY) + "px").style("left", (event.layerX + 10) + "px");
                })
                .on('mouseout', function () {
                    return tooltip.style("visibility", "hidden");
                });


            rects.exit().remove();

            // update the item labels
            labels = itemRects.selectAll('text')
                .data(visItems, function (d) {
                    return d.id;
                })
                .attr('x', function (d) {
                    return x1(Math.max(parseDate(d.start), minExtent)) + 2;
                });

            labels.enter().append('text')
                .text(function (d) {
                    return d.id + '%';
                })
                .attr('x', function (d) {
                    return x1(Math.max(parseDate(d.start), minExtent)) + 2;
                })
                .attr('y', function (d) {
                    return mainY(d.lane) + .22 * mainY(2.5);
                })
                .attr('text-anchor', 'start')
                .attr('class', 'itemLabel');

            labels.exit().remove();
        };

        var moveBrush = function () {
            var origin = d3.mouse(this)
                , point = x.invert(origin[0])
                , halfExtent = (brush.extent()[1].getTime() - brush.extent()[0].getTime()) / 2
                , start = new Date(point.getTime() - halfExtent)
                , end = new Date(point.getTime() + halfExtent);

            brush.extent([start, end]);
            display();
        };

    }

    module.exports = new d3Chart();
})();