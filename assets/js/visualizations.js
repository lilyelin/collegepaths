/* STRETCHED CHORD DIAGRAM */

function stretchedChord() {
    function n(n, t, r, u) {
        var e = t.call(n, r, u),
            a = g.call(n, e, u),
            c = h.call(n, e, u) - M,
            i = p.call(n, e, u) - M;
        return {
            r: a,
            a0: [c],
            a1: [i],
            p0: [a * Math.cos(c), a * Math.sin(c)],
            p1: [a * Math.cos(i), a * Math.sin(i)]
        }
    }

    function t(n, t, r) {
        var u = t[0] >= 0 ? 1 : -1;
        return "A" + n + "," + n + " 0 " + +(r > m) + ",1 " + (t[0] + u * d) + "," + t[1]
    }

    function r(n) {
        var t = n[0] >= 0 ? 1 : -1;
        return "Q 0,0 " + (n[0] + t * d) + "," + n[1]
    }

    function u(u, e) {
        var a = n(this, l, u, e),
            c = n(this, s, u, e);
        return "M" + (a.p0[0] + d) + "," + a.p0[1] + t(a.r, a.p1, a.a1 - a.a0) + r(c.p0) + t(c.r, c.p1, c.a1 - c.a0) + r(a.p0) + "Z"
    }

    function e(n) {
        return n.radius
    }

    function a(n) {
        return n.source
    }

    function c(n) {
        return n.target
    }

    function i(n) {
        return n.startAngle
    }

    function o(n) {
        return n.endAngle
    }

    function f(n) {
        return "function" == typeof n ? n : function() {
            return n
        }
    }
    var l = a,
        s = c,
        g = e,
        h = i,
        p = o,
        d = 0,
        m = Math.PI,
        M = m / 2;
    return u.radius = function(n) {
        return arguments.length ? (g = f(n), u) : g
    }, u.pullOutSize = function(n) {
        return arguments.length ? (d = n, u) : d
    }, u.source = function(n) {
        return arguments.length ? (l = f(n), u) : l
    }, u.target = function(n) {
        return arguments.length ? (s = f(n), u) : s
    }, u.startAngle = function(n) {
        return arguments.length ? (h = f(n), u) : h
    }, u.endAngle = function(n) {
        return arguments.length ? (p = f(n), u) : p
    }, u
};


function customChordLayout() {
    function n() {
        var n, g, f, v, h, d = {},
            m = [],
            p = d3.range(o),
            x = [];
        for (t = [], u = [], n = 0, v = -1; ++v < o;) {
            for (g = 0, h = -1; ++h < o;) g += e[v][h];
            m.push(g), x.push(d3.range(o).reverse()), n += g
        }
        for (a && p.sort(function(n, r) {
                return a(m[n], m[r])
            }), l && x.forEach(function(n, r) {
                n.sort(function(n, t) {
                    return l(e[r][n], e[r][t])
                })
            }), n = (c - i * o) / n, g = 0, v = -1; ++v < o;) {
            for (f = g, h = -1; ++h < o;) {
                var A = p[v],
                    b = x[A][h],
                    C = e[A][b],
                    y = g,
                    E = g += C * n;
                d[A + "-" + b] = {
                    index: A,
                    subindex: b,
                    startAngle: y,
                    endAngle: E,
                    value: C
                }
            }
            u[A] = {
                index: A,
                startAngle: f,
                endAngle: g,
                value: (g - f) / n
            }, g += i
        }
        for (v = -1; ++v < o;)
            for (h = v - 1; ++h < o;) {
                var G = d[v + "-" + h],
                    I = d[h + "-" + v];
                (G.value || I.value) && t.push(G.value < I.value ? {
                    source: I,
                    target: G
                } : {
                    source: G,
                    target: I
                })
            }
        s && r()
    }

    function r() {
        t.sort(function(n, r) {
            return s((n.source.value + n.target.value) / 2, (r.source.value + r.target.value) / 2)
        })
    }
    var t, u, e, o, a, l, s, g = Math.PI,
        c = 2 * g,
        f = {},
        i = 0;
    return f.matrix = function(n) {
        return arguments.length ? (o = (e = n) && e.length, t = u = null, f) : e
    }, f.padding = function(n) {
        return arguments.length ? (i = n, t = u = null, f) : i
    }, f.sortGroups = function(n) {
        return arguments.length ? (a = n, t = u = null, f) : a
    }, f.sortSubgroups = function(n) {
        return arguments.length ? (l = n, t = null, f) : l
    }, f.sortChords = function(n) {
        return arguments.length ? (s = n, t && r(), f) : s
    }, f.chords = function() {
        return t || n(), t
    }, f.groups = function() {
        return u || n(), u
    }, f
}

function startAngle(t) {
    return t.startAngle + offset
}

function endAngle(t) {
    return t.endAngle + offset
}

function fade(t) {
    return function(e, r) {
        wrapper.selectAll("path.chord").filter(function(t) {
            return t.source.index !== r && t.target.index !== r && "" !== Names[t.source.index]
        }).transition("fadeOnArc").style("opacity", t)
    }
}

function fadeOnChord(t) {
    var e = t;
    wrapper.selectAll("path.chord").transition("fadeOnChord").style("opacity", function(t) {
        return t.source.index === e.source.index && t.target.index === e.target.index ? opacityDefault : opacityLow
    })
}

function wrapChord(t, e) {
    t.each(function() {
        for (var t, r = d3.select(this), a = r.text().split(/\s+/).reverse(), n = [], i = 0, o = 1.1, s = 0, l = 0, d = parseFloat(r.attr("dy")), p = r.text(null).append("tspan").attr("x", l).attr("y", s).attr("dy", d + "em"); t = a.pop();) n.push(t), p.text(n.join(" ")), p.node().getComputedTextLength() > e && (n.pop(), p.text(n.join(" ")), n = [t], p = r.append("tspan").attr("x", l).attr("y", s).attr("dy", ++i * o + d + "em").text(t))
    })
}
var screenWidth = document.getElementById("totalChordWrapper").offsetWidth,
    mobileScreen = screenWidth > 500 ? !1 : !0,
    margin = {
        left: 50,
        top: 10,
        right: 50,
        bottom: 10
    },
    width = Math.min(screenWidth, 800) - margin.left - margin.right,
    height = (mobileScreen ? 300 : 5 * Math.min(screenWidth, 800) / 6) - margin.top - margin.bottom,
    svg = d3.select("#stretched-chord").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom),
    wrapper = svg.append("g").attr("class", "chordWrapper").attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")"),
    outerRadius = Math.min(width, height) / 2 - (mobileScreen ? 80 : 100),
    innerRadius = .95 * outerRadius,
    opacityDefault = .7,
    opacityLow = .02,
    pullOutSize = mobileScreen ? 20 : 50,
    titleWrapper = svg.append("g").attr("class", "chordTitleWrapper"),
    titleOffset = mobileScreen ? 15 : 40,
    titleSeparate = mobileScreen ? 30 : 0;
titleWrapper.append("text").attr("class", "title left").style("font-size", "1em").attr("x", width / 2 + margin.left - outerRadius - titleSeparate).attr("y", titleOffset).text("Major Field"), titleWrapper.append("line").attr("class", "titleLine left").attr("x1", .6 * (width / 2 + margin.left - outerRadius - titleSeparate)).attr("x2", 1.4 * (width / 2 + margin.left - outerRadius - titleSeparate)).attr("y1", titleOffset + 8).attr("y2", titleOffset + 8), titleWrapper.append("text").attr("class", "title right").style("font-size", "1em").attr("x", width / 2 + margin.left + outerRadius + titleSeparate).attr("y", titleOffset).text("Career Field"), titleWrapper.append("line").attr("class", "titleLine right").attr("x1", .6 * (width / 2 + margin.left - outerRadius - titleSeparate) + 2 * (outerRadius + titleSeparate)).attr("x2", 1.4 * (width / 2 + margin.left - outerRadius - titleSeparate) + 2 * (outerRadius + titleSeparate)).attr("y1", titleOffset + 8).attr("y2", titleOffset + 8);
var defs = wrapper.append("defs"),
    linearGradient = defs.append("linearGradient").attr("id", "animatedChordGradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0").attr("spreadMethod", "reflect");
linearGradient.append("animate").attr("attributeName", "x1").attr("values", "0%;100%").attr("dur", "7s").attr("repeatCount", "indefinite"), linearGradient.append("animate").attr("attributeName", "x2").attr("values", "100%;200%").attr("dur", "7s").attr("repeatCount", "indefinite"), linearGradient.append("stop").attr("offset", "5%").attr("stop-color", "#E8E8E8"), linearGradient.append("stop").attr("offset", "45%").attr("stop-color", "#A3A3A3"), linearGradient.append("stop").attr("offset", "555%").attr("stop-color", "#E8E8E8"), linearGradient.append("stop").attr("offset", "95%").attr("stop-color", "#A3A3A3");
var Names = ["Administration", "Arts and Design", "Business Management", "Law", "Health/Medicine", "Technology", "Writing/Communication", "Consulting", "Teaching", "Sales", "Government", "Engineering", "Other", "", "Engineering", "Environmental Design", "Natural Resources", "Humanities", "Natural Sciences", "Social Sciences", "Business", ""],
    respondents = 17533,
    emptyPerc = .5,
    emptyStroke = Math.round(respondents * emptyPerc),
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 232, 65, 44, 57, 39, 123, 1373, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 11, 0, 0, 24, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 173, 43, 52, 55, 36, 125, 2413, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 16, 13, 23, 10, 37, 54, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 161, 24, 17, 0, 2089, 85, 60, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 510, 0, 0, 57, 0, 0, 251, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 118, 10, 454, 99, 1537, 271, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 21, 10, 15, 125, 41, 261, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 2206, 37, 292, 32, 116, 76, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 74, 43, 116, 51, 135, 752, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 34, 0, 22, 27, 156, 36, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1141, 0, 111, 291, 0, 0, 48, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 39, 0, 0, 20, 109, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke],
        [232, 32, 173, 32, 161, 510, 16, 76, 32, 96, 15, 1141, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [65, 0, 43, 16, 24, 0, 118, 21, 2206, 74, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [44, 0, 52, 13, 17, 0, 10, 10, 37, 43, 0, 111, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [57, 11, 55, 23, 0, 57, 454, 15, 292, 116, 22, 291, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [39, 0, 36, 10, 2089, 0, 99, 125, 32, 51, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [123, 0, 125, 37, 85, 0, 1537, 41, 116, 135, 156, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1373, 24, 2413, 54, 60, 251, 271, 261, 76, 752, 36, 48, 109, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    offset = 2 * Math.PI * (emptyStroke / (respondents + emptyStroke)) / 4,
    chord = customChordLayout().padding(.02).sortChords(d3.descending).matrix(matrix),
    arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(endAngle),
    path = stretchedChord().radius(innerRadius).startAngle(startAngle).endAngle(endAngle).pullOutSize(pullOutSize),
    g = wrapper.selectAll(".chord-group").data(chord.groups).enter().append("g").attr("class", "chord-group").on("mouseover", fade(opacityLow)).on("mouseout", fade(opacityDefault));
g.append("path").style("stroke", function(t, e) {
    return "" === Names[e] ? "none" : "#264d8f"
}).style("fill", function(t, e) {
    return "" === Names[e] ? "none" : "#264d8f"
}).style("pointer-events", function(t, e) {
    return "" === Names[e] ? "none" : "auto"
}).attr("d", arc).attr("transform", function(t, e) {
    return t.pullOutSize = pullOutSize * (t.startAngle + .001 > Math.PI ? -1 : 1), "translate(" + t.pullOutSize + ",0)"
}), g.append("text").each(function(t) {
    t.angle = (t.startAngle + t.endAngle) / 2 + offset
}).attr("dy", ".35em").attr("class", "titles").style("font-size", "0.6em").attr("text-anchor", function(t) {
    return t.angle > Math.PI ? "end" : null
}).attr("transform", function(t, e) {
    var r = arc.centroid(t);
    return "translate(" + (r[0] + t.pullOutSize) + "," + r[1] + ")rotate(" + (180 * t.angle / Math.PI - 90) + ")translate(20,0)" + (t.angle > Math.PI ? "rotate(180)" : "")
}).text(function(t, e) {
    return Names[e]
}).call(wrapChord, 100), wrapper.selectAll("path.chord").data(chord.chords).enter().append("path").attr("class", "chord").style("stroke", "none").style("fill", "url(#animatedChordGradient)").style("opacity", function(t) {
    return "" === Names[t.source.index] ? 0 : opacityDefault
}).style("pointer-events", function(t, e) {
    return "" === Names[t.source.index] ? "none" : "auto"
}).style("display", function(t, e) {
    return "" === Names[t.source.index] ? "none" : null
}).attr("d", path);

/* CLUSTER GRAPH */

var w = 600,
          h = 600,
          r = 500,
          x = d3.scale.linear().range([0, r]),
          y = d3.scale.linear().range([0, r]),
          node,
          root;

        var pack = d3.layout.pack()
          .size([r, r])
          .padding(10)
          .sort(function(a, b) {
            return b.value - a.value;
          })
          .value(function(d) {
            return d.size;
          })

        var svg = d3.select("#clusterChart").append("svg")
          .attr("width", w)
          .attr("height", h)
          .append("svg:g")
          .attr("transform", "translate( 10, 0)");


        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            var personText = " people, ";
            if (d.size == 1) {
              personText = " person, ";
            }
            return "<span style='color:white'>" + d.size + "</span>" + personText + "<span style='color:white'>" + d.name + "</span>";
          });

        svg.call(tip);

        d3.json("/data/jobdiversity.json", function(data) {

          node = root = data;
          var nodes = pack.nodes(root);

          svg.selectAll("circle")
            .data(nodes)
            .enter().append("svg:circle")
            .attr("class", function(d) {
              return d.children ? "parent" : "child";
            })
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            })
            .attr("r", function(d) {
              return d.r;
            })
            .on("click", function(d) {
              if (d.depth == 2) {
                tip.hide(d);
              } else {
                return zoom(node == d ? root : d);
              }
            });

          svg.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 2;
            })
            .style("stroke-opacity", 0.2)
            .style("fill", "gray")
            .style("fill-opacity", 0.2)
            .on("mouseover", function(d, i) {
              tip.show(d);
              d3.select(this).style("stroke", "black");
              d3.select(this).style("stroke-opacity", 0.5);
            })
            .on("mouseout", function(d, i) {
              tip.hide(d);
              d3.select(this).style("stroke", "gray");
              d3.select(this).style("stroke-opacity", 0.2);
            });

          svg.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 1;
            })
            .style("fill", "#efefef")
            .style("fill-opacity", 1)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);

          svg.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 0;
            })
            .style("stroke", "white")
            .style("fill", "white")
            .style("fill-opacity", 0);

          svg.selectAll("text")
            .data(nodes)
            .enter().append("svg:text")
            .attr("class", function(d) {
              return d.children ? "parent" : "child";
            })
            .attr("x", function(d) {
              return d.x;
            })
            .attr("y", function(d) {
              return d.y;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("opacity", function(d) {
              if(d.depth == 1) {
                return d.r > 25 ? 1 : 0;
              } else {
                return 0;
              }
            })
            .text(function(d) {
              return d.name;
            });

          d3.select(window).on("click", function() {
            zoom(root);
          });
        });

        function zoom(d, i) {
          var k = r / d.r / 2;
          x.domain([d.x - d.r, d.x + d.r]);
          y.domain([d.y - d.r, d.y + d.r]);

          var t = svg.transition()
            .duration(d3.event.altKey ? 7500 : 750);

          t.selectAll("circle")
            .attr("cx", function(d) {
              return x(d.x);
            })
            .attr("cy", function(d) {
              return y(d.y);
            })
            .attr("r", function(d) {
              return k * d.r;
            });

          svg.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 2;
            })
            .style("fill", "gray")
            .style("fill-opacity", 0.2)
            .on("mouseover", function(d, i) {
              tip.show(d);
              d3.select(this).style("stroke", "black");
              d3.select(this).style("stroke-opacity", 0.5);
            })
            .on("mouseout", function(d, i) {
              tip.hide(d);
              d3.select(this).style("stroke", "gray");
              d3.select(this).style("stroke-opacity", 0.2);
            });

          t.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 1;
            })
            .style("fill", "#efefef")
            .style("fill-opacity", 1);

          t.selectAll("circle")
            .filter(function(d, i) {
              return d.depth == 0;
            })
            .style("stroke", "white")
            .style("fill", "white")
            .style("fill-opacity", 0);

          var clusterDepth = d.depth + 1;
          t.selectAll("text")
            .attr("x", function(d) {
              return x(d.x);
            })
            .attr("y", function(d) {
              return y(d.y);
            })
            .style("opacity", function(d) {
              if(clusterDepth == d.depth) {
                return k * d.r > 25 ? 1 : 0;
              } else {
                return 0;
              }
            });

          node = d;
          d3.event.stopPropagation();
        }