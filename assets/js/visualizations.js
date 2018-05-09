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
var Names = ["Administration", "Arts and Design", "Business/Management", "Law", "Health/Medicine", "Technology", "Writing/Communication", "Consulting", "Teaching", "Sales", "Government", "Engineering", "Other", "", "Engineering", "Art", "Natural Resources", "Humanities", "Sciences", "Social Sciences", "Business", ""],
    respondents = 1733,
    emptyPerc = .5,
    emptyStroke = Math.round(respondents * emptyPerc),
    matrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 11, 51, 24, 44, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 1, 13, 2, 7, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 1, 24, 73, 80, 192, 154, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 1, 16, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 7, 25, 17, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 250, 0, 5, 8, 47, 53, 16, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 2, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 2, 2, 9, 0, 35, 28, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 1, 7, 28, 40, 46, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 21, 4, 16, 7, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 8, 4, 16, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 2, 0, 3, 8, 6, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 2, 8, 29, 24, 40, 10, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke],
        [1, 0, 20, 0, 1, 250, 0, 12, 15, 1, 0, 83, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 13, 1, 0, 0, 0, 0, 2, 1, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [11, 1, 24, 0, 1, 5, 0, 2, 7, 1, 5, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [51, 13, 73, 13, 7, 8, 11, 9, 28, 21, 8, 3, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [24, 2, 80, 1, 25, 47, 0, 0, 40, 4, 4, 8, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [44, 7, 192, 16, 17, 53, 2, 35, 46, 16, 16, 6, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 4, 154, 0, 0, 16, 1, 28, 2, 7, 1, 1, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
}).attr("dy", ".35em").attr("class", "titles").style("font-size", "0.65em").attr("text-anchor", function(t) {
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

(function() {
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

d3.json("data/jobdiversity.json", function(data) {

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
})();

/* collapsible tree */

(function() {
var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#collapsibletree").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/majordiversity.json", function(error, flare) {
  if (error) throw error;

  root = flare;
  root.x0 = height / 2;
  root.y0 = 0;

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  root.children.forEach(collapse);
  update(root);
});

d3.select(self.frameElement).style("height", "800px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 200; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("stroke", "steelblue")
      .style("stroke-width", "1.5px")
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", "1.5px")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d);
}
})();