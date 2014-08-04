'use strict';


angular.module('WebPaige.Services.Sloter', ['ngResource'])


/**
 * Planboard data processors
 */
  .factory(
  'Sloter',
  [
    '$rootScope', 'Storage',
    function ($rootScope, Storage)
    {
      return {
        get: {
          groups: function ()
          {
            var groups = {};

            angular.forEach(
              Storage.local.groups(),
              function (group)
              {
                groups[group.uuid] = group.name;
              }
            );

            return groups;
          },

          members: function ()
          {
            var members = {};

            angular.forEach(
              Storage.local.members(),
              function (member)
              {
                members[member.uuid] = member.resources.firstName + ' ' + member.resources.lastName;
              }
            );

            return members;
          }
        },

        /**
         * Wrap for sorting in list
         */
        wrapper: function (rank) { return '<span style="display:none;">' + rank + '</span>' },

        /**
         * Wrap secrets in slot contents
         */
        secret: function (content) { return '<span class="secret">' + content + '</span>' },

        /**
         * Add loading bars on both ends
         */
        addLoading: function (data, timedata, rows)
        {
          angular.forEach(
            rows,
            function (row)
            {
              timedata.push(
                {
                  start: data.periods.end,
                  end: 1577836800000,
                  group: row,
                  content: 'loading',
                  className: 'state-loading-right',
                  editable: false
                }
              );

              timedata.push(
                {
                  start: 0,
                  end: data.periods.start,
                  group: row,
                  content: 'loading',
                  className: 'state-loading-left',
                  editable: false
                }
              );
            }
          );

          return timedata;
        },

        tooltip: function (periods)
        {
          // console.log('periods ->', periods);

          var convertTimestamp = function (stamp)
          {
            return new Date(stamp * 1000).toString($rootScope.config.formats.datetime)
          };

          var content = convertTimestamp(periods.start) +
                        ' / ' +
                        convertTimestamp(periods.end);

          if (periods.hasOwnProperty('min'))
          {
            content += ' / Huidig aantal beschikbaar: ' + periods.min;
          }

          if (periods.hasOwnProperty('wish'))
          {
            // console.log('periods wish ->', periods.wish);

            content += ' / Gewenst aantal mensen: ' + periods.wish;
          }

          if (periods.hasOwnProperty('member'))
          {
            content += ' / ' + periods.member;
          }

          if (periods.hasOwnProperty('state'))
          {
            // console.log('state ->', periods.state);

            content += ' / ' + periods.state;
          }

          return '<div class="time-tip" title="' + content + '">' + content + '</div>'
        },

        /**
         * Handle user slots
         */
        user: function (data, timedata, config)
        {
          var _this = this;

          angular.forEach(
            data.user,
            function (slot, index)
            {
              angular.forEach(
                config.legenda,
                function (value, legenda)
                {
                  if (slot.text == legenda && value)
                  {
                    timedata.push(
                      {
                        start: Math.round(slot.start * 1000),
                        end: Math.round(slot.end * 1000),
                        group: (slot.recursive) ?
                               _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') :
                               _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                        content: this.tooltip({ start: slot.start, end: slot.end }) +
                                 _this.secret(
                                   angular.toJson(
                                     {
                                       type: 'slot',
                                       id: index, // slot.id,
                                       recursive: slot.recursive,
                                       state: slot.text
                                     }
                                   )
                                 ),
                        className: 'slot-' + index + ' ' + config.states[slot.text].className,
                        editable: true
                      });
                  }
                }.bind(this)
              );
            }.bind(this)
          );

          timedata = _this.addLoading(
            data, timedata, [
                _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
                _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning')
            ]);

          return timedata;
        },

        /**
         * TODO: Look for ways to combine with user
         *
         * Profile timeline data processing
         */
        profile: function (data, config)
        {
          var _this = this,
              timedata = [];

          angular.forEach(
            data,
            function (slot, index)
            {
              angular.forEach(
                config.legenda,
                function (value, legenda)
                {
                  if (slot.text == legenda && value)
                  {
                    timedata.push(
                      {
                        start: Math.round(slot.start * 1000),
                        end: Math.round(slot.end * 1000),
                        group: (slot.recursive) ?
                               _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') :
                               _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                        content: _this.secret(
                          angular.toJson(
                            {
                              type: 'slot',
                              id: index, // slot.id,
                              recursive: slot.recursive,
                              state: slot.text
                            }
                          )
                        ),
                        className: 'slot-' + index + ' ' + config.states[slot.text].className,
                        editable: true
                      }
                    );
                  }
                }
              );
            }
          );

          timedata.push(
            {
              start: 0,
              end: 1,
              group: _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
              content: '',
              className: null,
              editable: false
            }
          );

          timedata.push(
            {
              start: 0,
              end: 1,
              group: _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
              content: '',
              className: null,
              editable: false
            }
          );

          return timedata;
        },

        /**
         * Handle group name whether divisions selected
         */
        namer: function (agg, privilage)
        {
          var groups = this.get.groups(),
              name = groups[agg.id];

          name = name.charAt(0).toUpperCase() + name.slice(1);

          var link = '<a href="#/groups?uuid=' +
                     agg.id +
                     '#view">' +
                     name +
                     '</a>',
              title;

          if (! agg.division)
          {
            title = (privilage <= 1) ? link : '<span>' + name + '</span>';
          }
          else
          {
            var label;

            title = (privilage <= 1) ? link : '<span>' + name + '</span>';

            title += ' <span class="label">' + agg.division.label + '</span>';
          }

          return title;
        },

        /**
         * Handle group aggs (with divisions) with bars
         */
        bars: function (data, timedata, config, privilage, current)
        {
          var _this = this,
              maxh = 0;

          angular.forEach(
            _this.filtered(data, current),
            function (agg)
            {
              var name = _this.namer(agg, privilage);

              angular.forEach(
                agg.data,
                function (slot)
                {
                  if (slot.wish > maxh)
                  {
                    maxh = slot.wish;
                  }
                }
              );

              angular.forEach(
                agg.data,
                function (slot)
                {
                  var maxNum = maxh,
                      num = slot.wish,
                      xwish = num,
                      height = Math.round(num / maxNum * 80 + 20), // a percentage, with a lower bound on 20%
                      minHeight = height,
                      style = 'height:' + height + 'px;',
                      requirement = '<div class="requirement" style="' +
                                    style +
                                    '" ' +
                                    'title="' + 'Minimum aantal benodigden' + ': ' +
                                    num +
                                    ' personen"></div>';

                  num = slot.wish + slot.diff;

                  var xcurrent = num;

                  height = Math.round(num / maxNum * 80 + 20);

                  if (slot.diff >= 0 && slot.diff < 7)
                  {
                    var color;

                    switch (slot.diff)
                    {
                      case 0:
                        // color = config.densities.even;
                        color = 'bars-even';
                        break;
                      case 1:
                        // color = config.densities.one;
                        color = 'bars-more';
                        break;
                      case 2:
                        // color = config.densities.two;
                        color = 'bars-more';
                        break;
                      case 3:
                        // color = config.densities.three;
                        color = 'bars-more';
                        break;
                      case 4:
                        // color = config.densities.four;
                        color = 'bars-more';
                        break;
                      case 5:
                        // color = config.densities.five;
                        color = 'bars-more';
                        break;
                      case 6:
                        // color = config.densities.six;
                        color = 'bars-more';
                        break;
                    }
                  }
                  else if (slot.diff >= 7)
                  {
                    // color = config.densities.more;
                    color = 'bars-more';
                  }
                  else
                  {
                    // color = config.densities.less;
                    color = 'bars-less';
                  }

                  var span = '<span class="badge badge-inverse">' + slot.diff + '</span>';

                  if (xcurrent > xwish) height = minHeight;

                  // style = 'height:' + height + 'px;' + 'background-color: ' + color + ';';
                  style = 'height:' + height + 'px;';

                  var actual = '<div class="bar ' + color + '" style="' +
                               style +
                               '" ' +
                               ' title="Huidig aantal beschikbaar: ' +
                               num +
                               ' personen">' +
                               span +
                               '</div>';

                  if ((slot.diff > 0 && config.legenda.groups.more) ||
                      (slot.diff == 0 && config.legenda.groups.even) ||
                      (slot.diff < 0 && config.legenda.groups.less))
                  {
                    timedata.push(
                      {
                        start: Math.round(slot.start * 1000),
                        end: Math.round(slot.end * 1000),
                        group: _this.wrapper('c') + name,
                        content: requirement +
                                 actual +
                                 _this.secret(
                                   angular.toJson(
                                     {
                                       type: 'group',
                                       diff: slot.diff,
                                       group: name
                                     })),
                        className: 'group-aggs',
                        editable: false
                      }
                    );
                  }

                  timedata = _this.addLoading(
                    data, timedata, [
                        _this.wrapper('c') + name
                    ]
                  );
                }
              );
            }
          );

          return timedata;
        },

        /**
         * Process plain group aggs
         */
        aggs: function (data, timedata, config, privilage, current)
        {
          var _this = this;

          angular.forEach(
            _this.filtered(data, current),
            function (agg)
            {
              var name = _this.namer(agg, privilage);

              angular.forEach(
                agg.data,
                function (slot)
                {
                  // console.log('slot ->', slot);

                  var cn;

                  if (slot.diff >= 0 && slot.diff < 7)
                  {
                    switch (slot.diff)
                    {
                      case 0:
                        cn = 'even';
                        break;
                      case 1:
                        cn = 1;
                        break;
                      case 2:
                        cn = 2;
                        break;
                      case 3:
                        cn = 3;
                        break;
                      case 4:
                        cn = 4;
                        break;
                      case 5:
                        cn = 5;
                        break;
                      case 6:
                        cn = 6;
                        break;
                    }
                  }
                  else if (slot.diff >= 7)
                  {
                    cn = 'more';
                  }
                  else
                  {
                    cn = 'less'
                  }

                  if ((slot.diff > 0 && config.legenda.groups.more) ||
                      (slot.diff == 0 && config.legenda.groups.even) ||
                      (slot.diff < 0 && config.legenda.groups.less))
                  {
                    timedata.push(
                      {
                        start: Math.round(slot.start * 1000),
                        end: Math.round(slot.end * 1000),
                        group: _this.wrapper('c') + name,
                        content: this.tooltip({ start: slot.start, end: slot.end, min: slot.wish + slot.diff }) +
                          // '<span class="badge badge-inverse">' + cn + '</span>' +
                                 _this.secret(
                                   angular.toJson(
                                     {
                                       type: 'group',
                                       diff: slot.diff,
                                       group: name
                                     })),
                        className: 'agg-' + cn,
                        editable: false
                      }
                    );
                  }

                  timedata = _this.addLoading(
                    data,
                    timedata,
                    [_this.wrapper('c') + name]
                  );
                }.bind(this)
              );
            }.bind(this)
          );

          return timedata;
        },

        /**
         * Wish slots
         */
        wishes: function (data, timedata, privilage)
        {
          var _this = this;

          var groups = this.get.groups(),
              name = groups[data.aggs[0].id],
              link = '<a href="#/groups?uuid=' +
                     data.aggs[0].id +
                     '#view">' +
                     name +
                     '</a>',
              title;

          title = (privilage == 1) ? link : '<span>' + name + '</span>';

          title += ' <span class="label">Behoefte (elke divisie)</span>';

          angular.forEach(
            data.aggs.wishes,
            function (wish)
            {
              var cn;

              if (wish.count >= 7)
              {
                cn = 'wishes-more';
              }
              else if (wish.count == 0)
              {
                cn = 'wishes-even';
              }
              else
              {
                cn = 'wishes-' + wish.count;
              }

              timedata.push(
                {
                  start: Math.round(wish.start * 1000),
                  end: Math.round(wish.end * 1000),
                  group: _this.wrapper('c') + title,
                  content: this.tooltip({ start: wish.start, end: wish.end, wish: wish.count }) +
                           _this.secret(
                             angular.toJson(
                               {
                                 type: 'wish',
                                 wish: wish.count,
                                 group: title,
                                 groupId: data.aggs[0].id
                               })),
                  className: cn,
                  editable: false
                }
              );

              timedata = _this.addLoading(
                data, timedata, [
                    _this.wrapper('c') + title
                ]
              );
            }.bind(this)
          );

          return timedata;
        },

        /**
         * Process members
         */
        members: function (data, timedata, config, privilage)
        {
          var _this = this,
              members = this.get.members(),
              filtered = [];

          angular.forEach(
            data.members,
            function (member)
            {
              if (member.lastName != undefined && member.role != 4 && member.role != 0)
              {
                filtered.push(member);
              }
            }
          );

          data.members = filtered;

          data.members.sort(
            function (a, b)
            {
              var aName = a.lastName.toLowerCase(),
                  bName = b.lastName.toLowerCase();

              if (aName < bName)
              {
                return - 1;
              }

              if (aName > bName)
              {
                return 1;
              }

              return 0;
            }
          );

          angular.forEach(
            data.members,
            function (member)
            {
              var user = ($rootScope.app.resources.uuid == member.id) ? 'profile' : 'timeline';

              var link = (privilage <= 1) ?
                         _this.wrapper('d-' + member.lastName[0].toLowerCase()) +
                         '<a href="#/profile/' +
                         member.id +
                         '#' + user + '">' +
                         members[member.id] +
                         '</a>' :
                         _this.wrapper('d-' + member.lastName[0].toLowerCase()) +
                         members[member.id];

              angular.forEach(
                member.data,
                function (slot)
                {
                  angular.forEach(
                    config.legenda,
                    function (value, legenda)
                    {
                      if (slot.text == legenda && value)
                      {
                        var tooltip = {
                          start: slot.start,
                          end: slot.end,
                          member: members[member.id],
                          state: config.states[slot.text].label
                        };

                        timedata.push(
                          {
                            start: Math.round(slot.start * 1000),
                            end: Math.round(slot.end * 1000),
                            group: link,
                            content: this.tooltip(tooltip) +
                                     _this.secret(
                                       angular.toJson(
                                         {
                                           type: 'member',
                                           id: slot.id,
                                           mid: member.id,
                                           recursive: slot.recursive,
                                           state: slot.text
                                         }
                                       )
                                     ),
                            className: config.states[slot.text].className,
                            editable: false
                          }
                        );
                      }
                    }.bind(this)
                  );
                }.bind(this)
              );

              timedata.push(
                {
                  start: 0,
                  end: 0,
                  group: link,
                  content: null,
                  className: null,
                  editable: false
                });

              timedata = _this.addLoading(data, timedata, [link]);

              /**
               * TODO: Good place to host this here?
               */
              angular.forEach(
                member.stats,
                function (stat)
                {
                  var state = stat.state.split('.');
                  state.reverse();

                  stat.state = (stat.state.match(/bar-(.*)/)) ? stat.state : 'bar-' + state[0];
                }
              );
            }.bind(this)
          );

          return timedata;
        },

        /**
         * Produce pie charts
         */
        pies: function (data, current)
        {
          var _this = this;

          angular.forEach(
            _this.filtered(data, current),
            function (agg)
            {
              var id;

              id = ($rootScope.config.timeline.config.divisions.length > 0) ? agg.division.id : '';

              if ($.browser.msie && $.browser.version == '8.0')
              {
                $('#' + 'groupPie-' + id).html('');
              }
              else
              {
                document.getElementById('groupPie-' + id).innerHTML = '';
              }

              var ratios = [],
                  //                  colorMap = {
                  //                    more: '#415e6b',
                  //                    even: '#ba6a24',
                  //                    less: '#a0a0a0'
                  //                  },
                  colorMap = {
                    more: '#6cad6c',
                    even: '#e09131',
                    less: '#d34545'
                  },
                  colors = [],
                  xratios = [];

              angular.forEach(
                agg.ratios,
                function (ratio, index)
                {
                  if (ratio != 0)
                  {
                    ratios.push(
                      {
                        ratio: ratio,
                        color: colorMap[index]
                      }
                    );
                  }
                }
              );

              ratios = ratios.sort(function (a, b) { return b.ratio - a.ratio });

              angular.forEach(
                ratios,
                function (ratio)
                {
                  colors.push(ratio.color);
                  xratios.push(ratio.ratio);
                }
              );

              var r = Raphael('groupPie-' + id),
                  pie = r.piechart(120, 120, 100, xratios, { colors: colors });
            });
        },


        /**
         * Filter group agg data based on selected divisions
         */
        filtered: function (data, current)
        {
          var filtered = [];

          if (current.division == 'all')
          {
            filtered = data.aggs;
          }
          else
          {
            angular.forEach(
              data.aggs,
              function (agg)
              {
                if (current.division == agg.division.id)
                {
                  filtered.push(agg);
                }
              }
            );
          }

          return filtered;
        },

        /**
         * Timeline data processing
         */
        process: function (data, config, divisions, privilage, current)
        {
          var _this = this,
              timedata = [];

          if (data.user) timedata = _this.user(data, timedata, config);

          if (data.aggs)
          {
            if (config.bar)
            {
              timedata = _this.bars(data, timedata, config, privilage, current);
            }
            else
            {
              timedata = _this.aggs(data, timedata, config, privilage, current);
            }
          }

          if (config.wishes && data.aggs) timedata = _this.wishes(data, timedata, privilage);

          if (data.members) timedata = _this.members(data, timedata, config, privilage);

          if (data.aggs)
          {
            setTimeout(
              function () { _this.pies(data, current) },
              $rootScope.config.timers.TICKER
            );
          }

          return timedata;
        }

      }
    }
  ]);