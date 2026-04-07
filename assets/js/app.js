(function () {
  const data = window.CAMINO_DATA;

  const photoItems = [
    { src: "photos/web/IMG_2858.jpg", caption: "Camino memory 01" },
    { src: "photos/web/IMG_2864.jpg", caption: "Camino memory 02" },
    { src: "photos/web/IMG_2869.jpg", caption: "Camino memory 03" },
    { src: "photos/web/IMG_2876.jpg", caption: "Camino memory 04" },
    { src: "photos/web/IMG_2886.jpg", caption: "Camino memory 05" },
    { src: "photos/web/IMG_2896.jpg", caption: "Camino memory 06" },
    { src: "photos/web/IMG_2940.jpg", caption: "Camino memory 07" },
    { src: "photos/web/IMG_2971.jpg", caption: "Camino memory 08" },
    { src: "photos/web/IMG_2975.jpg", caption: "Camino memory 09" },
    { src: "photos/web/IMG_2983.jpg", caption: "Camino memory 10" },
    { src: "photos/web/IMG_2995.jpg", caption: "Camino memory 11" },
    { src: "photos/web/IMG_3012.jpg", caption: "Camino memory 12" },
    { src: "photos/web/IMG_3026.jpg", caption: "Camino memory 13" },
    { src: "photos/web/IMG_3032.jpg", caption: "Camino memory 14" },
    { src: "photos/web/IMG_3034.jpg", caption: "Camino memory 15" },
    { src: "photos/web/IMG_3050.jpg", caption: "Camino memory 16" },
    { src: "photos/web/IMG_3064.jpg", caption: "Camino memory 17" },
    { src: "photos/web/IMG_3071.jpg", caption: "Camino memory 18" },
    { src: "photos/web/IMG_3075.jpg", caption: "Camino memory 19" },
    { src: "photos/web/IMG_3107.jpg", caption: "Camino memory 20" },
    { src: "photos/web/IMG_3121.jpg", caption: "Camino memory 21" },
    { src: "photos/web/IMG_3124.jpg", caption: "Camino memory 22" },
    { src: "photos/web/IMG_3126.jpg", caption: "Camino memory 23" },
    { src: "photos/web/IMG_3132.jpg", caption: "Camino memory 24" },
    { src: "photos/web/IMG_3133.jpg", caption: "Camino memory 25" },
    { src: "photos/web/IMG_3138.jpg", caption: "Camino memory 26" },
    { src: "photos/web/IMG_3161.jpg", caption: "Camino memory 27" },
    { src: "photos/web/IMG_3180.jpg", caption: "Camino memory 28" },
    { src: "photos/web/IMG_3185.jpg", caption: "Camino memory 29" },
    { src: "photos/web/IMG_3197.jpg", caption: "Camino memory 30" },
    { src: "photos/web/IMG_3201.jpg", caption: "Camino memory 31" },
    { src: "photos/web/IMG_3203.jpg", caption: "Camino memory 32" },
    { src: "photos/web/IMG_3208.jpg", caption: "Camino memory 33" },
    { src: "photos/web/IMG_3217.jpg", caption: "Camino memory 34" },
    { src: "photos/web/IMG_3223.jpg", caption: "Camino memory 35" },
    { src: "photos/web/IMG_3248.jpg", caption: "Camino memory 36" },
    { src: "photos/web/IMG_3249.jpg", caption: "Camino memory 37" },
    { src: "photos/web/IMG_3256.jpg", caption: "Camino memory 38" },
    { src: "photos/web/IMG_3276.jpg", caption: "Camino memory 39" },
    { src: "photos/web/IMG_3300.jpg", caption: "Camino memory 40" },
    { src: "photos/web/IMG_3306.jpg", caption: "Camino memory 41" },
    { src: "photos/web/IMG_3311.jpg", caption: "Camino memory 42" },
    { src: "photos/web/IMG_3313.jpg", caption: "Camino memory 43" },
    { src: "photos/web/IMG_3318.jpg", caption: "Camino memory 44" },
    { src: "photos/web/IMG_3338.jpg", caption: "Camino memory 45" },
    { src: "photos/web/IMG_3351.jpg", caption: "Camino memory 46" },
    { src: "photos/web/IMG_3355.jpg", caption: "Camino memory 47" },
    { src: "photos/web/IMG_3392.jpg", caption: "Camino memory 48" },
    { src: "photos/web/IMG_3393.jpg", caption: "Camino memory 49" },
    { src: "photos/web/IMG_3416.jpg", caption: "Camino memory 50" },
    { src: "photos/web/IMG_3419.jpg", caption: "Camino memory 51" },
    { src: "photos/web/IMG_3421.jpg", caption: "Camino memory 52" },
    { src: "photos/web/IMG_3424.jpg", caption: "Camino memory 53" },
    { src: "photos/web/IMG_3431.jpg", caption: "Camino memory 54" },
    { src: "photos/web/IMG_3437.jpg", caption: "Camino memory 55" },
  ];

  let currentPhoto = 0;

  const $ = (selector) => document.querySelector(selector);
  const fmt = (value) => new Intl.NumberFormat("en-US").format(value);
  const stageColor = (stage) => data.stages.find((item) => item.day === stage)?.color || "#b76034";

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function init() {
    if (!data) {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div class="noscript">Camino data could not be loaded.</div>'
      );
      return;
    }

    renderHero();
    renderOverviewStats();
    renderStats();
    renderLegend();
    renderStages();
    renderRouteFallback();
    renderMap();
    renderElevationChart();
    renderPaceChart();
    renderHiddenFacts();
    renderRestEvents();
    renderCarousel();
    renderProvenance();
  }

  function renderHero() {
    const summary = data.summary;
    setText("#heroDistance", `${summary.narrativeDistanceKm.toFixed(1)} km`);
    setText("#heroSteps", fmt(summary.steps));
    setText("#heroGain", `${fmt(summary.elevationGainM)} m`);
    setText("#heroPoints", fmt(summary.gpsPoints));
    setText("#photoCount", fmt(photoItems.length));
  }

  function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
  }

  function renderOverviewStats() {
    const summary = data.summary;
    const items = [
      [`${summary.narrativeDistanceKm.toFixed(1)} km`, "walked"],
      ["5", "days"],
      [fmt(summary.steps), "steps"],
      [`+${fmt(summary.elevationGainM)} m`, "climbed"],
      [`${fmt(summary.gpsPoints)}`, "GPS points"],
    ];

    $("#overviewStats").innerHTML = items
      .map(
        ([value, label]) => `
          <div>
            <b>${escapeHtml(value)}</b>
            <span>${escapeHtml(label)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderStats() {
    const summary = data.summary;
    const stats = [
      ["Narrative distance", `${summary.narrativeDistanceKm.toFixed(1)} km`, "The human story total from the existing route writeup."],
      ["GPS sampled distance", `${summary.gpsDistanceKm.toFixed(1)} km`, "Computed from the merged GPX point-to-point track."],
      ["Time on route", `${summary.totalRouteTimeHours.toFixed(1)} h`, `${summary.movingHours.toFixed(1)} h moving, ${summary.restHours.toFixed(1)} h resting.`],
      ["Total steps", fmt(summary.steps), "Estimated from a 0.72 m walking stride."],
      ["Elevation gain", `${fmt(summary.elevationGainM)} m`, `Highest point: ${summary.highestPoint.name}, ${summary.highestPoint.elevationM} m.`],
      ["Elevation loss", `${fmt(summary.elevationLossM)} m`, `Lowest recorded point: ${summary.lowestPointM} m.`],
      ["Direct line", `${summary.directDistanceKm.toFixed(1)} km`, "Sarria to the cathedral as the crow flies."],
      ["Route/direct ratio", `${summary.routeDirectRatio}x`, "The Camino was 36% longer than the straight line."],
    ];

    $("#statsGrid").innerHTML = stats
      .map(
        ([label, value, note]) => `
          <article class="stat-card">
            <span>${escapeHtml(label)}</span>
            <b>${escapeHtml(value)}</b>
            <p>${escapeHtml(note)}</p>
          </article>
        `
      )
      .join("");
  }

  function renderLegend() {
    $("#legend").innerHTML = data.stages
      .map(
        (stage) => `
          <div class="legend-item">
            <span class="legend-swatch" style="background:${stage.color}"></span>
            <span>Day ${stage.day}: ${escapeHtml(stage.from)} to ${escapeHtml(stage.to)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderStages() {
    $("#stageCards").innerHTML = data.stages
      .map(
        (stage) => `
          <article class="stage-card" style="--stage-color:${stage.color}">
            <div>
              <span class="stage-kicker">Stage ${stage.day} - ${escapeHtml(stage.date)}</span>
              <h3>${escapeHtml(stage.title)}</h3>
              <p class="stage-meta">${stage.narrativeStart} to ${stage.narrativeEnd} - night in ${escapeHtml(stage.night)}</p>
              <span class="stage-badge">${escapeHtml(stage.badge)}</span>
            </div>
            <p class="stage-story">${escapeHtml(stage.story)}</p>
            <div class="stage-metrics">
              ${metric("Distance", `${stage.distanceKm.toFixed(2)} km`)}
              ${metric("Gain / loss", `+${fmt(stage.gainM)} / -${fmt(stage.lossM)} m`)}
              ${metric("Moving", `${stage.moving}`)}
              ${metric("Rest", `${stage.rest} (${stage.restPercent}%)`)}
              ${metric("Pace", `${stage.movingPaceMinKm} min/km`)}
              ${metric("Steps", fmt(stage.steps))}
            </div>
          </article>
        `
      )
      .join("");
  }

  function metric(label, value) {
    return `
      <div class="metric">
        <span>${escapeHtml(label)}</span>
        <b>${escapeHtml(value)}</b>
      </div>
    `;
  }

  function renderMap() {
    const mapCard = $(".map-card");
    if (mapCard) mapCard.classList.add("clean-map-active");
  }

  function groupByStage(points) {
    return points.reduce((acc, point) => {
      const stage = point[4];
      acc[stage] ||= [];
      acc[stage].push(point);
      return acc;
    }, {});
  }

  function renderRouteFallback() {
    const bounds = data.route.bounds;
    const width = 900;
    const height = 540;
    const pad = 56;
    const lonSpan = bounds.east - bounds.west;
    const latSpan = bounds.north - bounds.south;
    const project = (point) => {
      const x = pad + ((point[1] - bounds.west) / lonSpan) * (width - pad * 2);
      const y = pad + ((bounds.north - point[0]) / latSpan) * (height - pad * 2);
      return [x.toFixed(1), y.toFixed(1)];
    };

    const stageLines = Object.entries(groupByStage(data.route.points))
      .map(([stage, points]) => {
        const coords = points.map((point) => project(point).join(",")).join(" ");
        return `<polyline points="${coords}" fill="none" stroke="${stageColor(Number(stage))}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
      })
      .join("");

    const start = project(data.route.points[0]);
    const finish = project(data.route.points[data.route.points.length - 1]);
    const stops = data.waypoints
      .filter((waypoint) => ["Start", "Sleep", "Finish", "Summit"].includes(waypoint.type))
      .map((waypoint) => {
        const [x, y] = project([waypoint.lat, waypoint.lon]);
        const label = waypoint.type === "Sleep" ? waypoint.name.replace("NIGHT ", "Night ") : waypoint.name;
        const fill = waypoint.type === "Finish" ? "#436f95" : waypoint.type === "Start" ? "#597642" : waypoint.type === "Summit" ? "#b76034" : "#fff9ec";
        return `
          <g>
            <circle cx="${x}" cy="${y}" r="8" fill="${fill}" stroke="#2f261c" stroke-width="2"/>
            <text x="${Number(x) + 12}" y="${Number(y) - 10}" class="map-label">${escapeHtml(label)}</text>
          </g>
        `;
      })
      .join("");

    $("#routeFallback").innerHTML = `
      <svg class="fallback-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Static fallback route line from Sarria to Santiago">
        <defs>
          <radialGradient id="mapGlow" cx="68%" cy="28%" r="70%">
            <stop offset="0%" stop-color="#f4d6a6"/>
            <stop offset="100%" stop-color="#fff9ec"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="34" fill="url(#mapGlow)"/>
        <path d="M ${pad} ${height - pad} C ${width * 0.25} ${height * 0.08}, ${width * 0.76} ${height * 0.96}, ${width - pad} ${pad}" fill="none" stroke="rgba(47,38,28,0.07)" stroke-width="30" stroke-linecap="round"/>
        ${stageLines}
        ${stops}
        <circle cx="${start[0]}" cy="${start[1]}" r="10" fill="#597642" stroke="#2f261c" stroke-width="2"/>
        <circle cx="${finish[0]}" cy="${finish[1]}" r="10" fill="#436f95" stroke="#2f261c" stroke-width="2"/>
        <text x="${Number(start[0]) + 16}" y="${Number(start[1]) + 5}" class="axis-label">Sarria</text>
        <text x="${Number(finish[0]) - 112}" y="${Number(finish[1]) - 12}" class="axis-label">Santiago</text>
        <text x="${pad}" y="${height - 24}" class="chart-note">${data.summary.narrativeDistanceKm.toFixed(1)} km · 5 days · ${fmt(data.summary.gpsPoints)} GPS points</text>
      </svg>
    `;
  }

  function renderElevationChart() {
    const profile = data.elevationProfile;
    const width = 900;
    const height = 320;
    const pad = { top: 24, right: 26, bottom: 40, left: 54 };
    const maxKm = Math.max(...profile.map((point) => point[0]));
    const minEle = Math.min(...profile.map((point) => point[1]));
    const maxEle = Math.max(...profile.map((point) => point[1]));
    const x = (km) => pad.left + (km / maxKm) * (width - pad.left - pad.right);
    const y = (ele) =>
      pad.top + ((maxEle - ele) / (maxEle - minEle)) * (height - pad.top - pad.bottom);

    const line = profile.map((point) => `${x(point[0]).toFixed(1)},${y(point[1]).toFixed(1)}`).join(" ");
    const area = `${pad.left},${height - pad.bottom} ${line} ${width - pad.right},${height - pad.bottom}`;
    const stageTicks = data.stages
      .reduce((acc, stage) => {
        const previous = acc.length ? acc[acc.length - 1].km : 0;
        acc.push({ km: previous + stage.distanceKm, color: stage.color, day: stage.day });
        return acc;
      }, [])
      .slice(0, -1)
      .map(
        (tick) =>
          `<line x1="${x(tick.km)}" x2="${x(tick.km)}" y1="${pad.top}" y2="${height - pad.bottom}" stroke="${tick.color}" stroke-dasharray="4 7" opacity="0.45"/>`
      )
      .join("");

    $("#elevationChart").innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Elevation profile from Sarria to Santiago">
        <defs>
          <linearGradient id="elevationFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#b76034" stop-opacity="0.34"/>
            <stop offset="100%" stop-color="#b76034" stop-opacity="0.03"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="rgba(255,249,236,0.72)"/>
        ${stageTicks}
        <polyline points="${area}" fill="url(#elevationFill)" stroke="none"/>
        <polyline points="${line}" fill="none" stroke="#7a3e25" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="${pad.left}" x2="${width - pad.right}" y1="${height - pad.bottom}" y2="${height - pad.bottom}" stroke="rgba(47,38,28,0.22)"/>
        <line x1="${pad.left}" x2="${pad.left}" y1="${pad.top}" y2="${height - pad.bottom}" stroke="rgba(47,38,28,0.22)"/>
        <text x="${pad.left}" y="${height - 12}" class="axis-label">0 km</text>
        <text x="${width - 95}" y="${height - 12}" class="axis-label">${maxKm.toFixed(0)} km</text>
        <text x="12" y="${y(maxEle) + 4}" class="axis-label">${Math.round(maxEle)} m</text>
        <text x="12" y="${y(minEle) + 4}" class="axis-label">${Math.round(minEle)} m</text>
        <text x="${x(data.summary.highestPoint.km) + 8}" y="${y(data.summary.highestPoint.elevationM) - 10}" class="chart-note">Alto de Rosario</text>
        <circle cx="${x(data.summary.highestPoint.km)}" cy="${y(data.summary.highestPoint.elevationM)}" r="6" fill="#7a3e25"/>
      </svg>
    `;
  }

  function renderPaceChart() {
    const buckets = data.paceBuckets.filter((bucket) => bucket.minutes <= 90);
    const width = 900;
    const height = 320;
    const pad = { top: 24, right: 24, bottom: 42, left: 54 };
    const maxKm = Math.max(...buckets.map((bucket) => bucket.km + 1));
    const maxMinutes = Math.max(...buckets.map((bucket) => bucket.minutes));
    const barWidth = (width - pad.left - pad.right) / maxKm;
    const y = (minutes) =>
      pad.top + ((maxMinutes - minutes) / maxMinutes) * (height - pad.top - pad.bottom);
    const bars = buckets
      .map((bucket) => {
        const x = pad.left + bucket.km * barWidth;
        const barHeight = height - pad.bottom - y(bucket.minutes);
        const opacity = bucket.minutes > 40 ? 0.95 : 0.62;
        return `<rect x="${x.toFixed(1)}" y="${y(bucket.minutes).toFixed(1)}" width="${Math.max(barWidth - 1, 1).toFixed(1)}" height="${barHeight.toFixed(1)}" rx="2" fill="${stageColor(bucket.stage)}" opacity="${opacity}"><title>Km ${bucket.km}-${bucket.km + 1}: ${bucket.minutes} min</title></rect>`;
      })
      .join("");

    $("#paceChart").innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Clock minutes per kilometer">
        <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="rgba(255,249,236,0.72)"/>
        ${bars}
        <line x1="${pad.left}" x2="${width - pad.right}" y1="${height - pad.bottom}" y2="${height - pad.bottom}" stroke="rgba(47,38,28,0.22)"/>
        <line x1="${pad.left}" x2="${pad.left}" y1="${pad.top}" y2="${height - pad.bottom}" stroke="rgba(47,38,28,0.22)"/>
        <text x="${pad.left}" y="${height - 12}" class="axis-label">0 km</text>
        <text x="${width - 95}" y="${height - 12}" class="axis-label">${maxKm} km</text>
        <text x="12" y="${pad.top + 10}" class="axis-label">${Math.round(maxMinutes)} min</text>
        <text x="12" y="${height - pad.bottom}" class="axis-label">0</text>
        <text x="${pad.left + 360}" y="${pad.top + 24}" class="chart-note">Spikes = rests, food stops, or very slow movement</text>
      </svg>
    `;
  }

  function renderHiddenFacts() {
    $("#hiddenFacts").innerHTML = data.hiddenFacts
      .map((fact) => `<li>${escapeHtml(fact)}</li>`)
      .join("");
  }

  function renderRestEvents() {
    $("#restEvents").innerHTML = data.restEvents
      .map((event) => {
        const near =
          event.nearDistanceM > 1000
            ? "between mapped landmarks"
            : `near ${event.near}`;
        return `
          <article class="rest-item">
            <div class="rest-duration">${event.durationMin}m</div>
            <div>
              <b>Stage ${event.stage}, km ${event.km}</b>
              <p class="rest-meta">${event.date}, ${event.start}-${event.end} - ${escapeHtml(near)} - GPS drift ${event.driftM} m</p>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderCarousel() {
    const prev = $("#prevPhoto");
    const next = $("#nextPhoto");

    if (!photoItems.length) {
      $("#photoCarousel").innerHTML = `
        <div class="photo-empty-grid">
          ${placeholder("Stage 1", "Forest paths, bridges, and leaving Sarria.")}
          ${placeholder("Stage 3", "Melide, pulpo, Ribadiso, and the long day.")}
          ${placeholder("Stage 5", "Monte do Gozo and the arrival at Santiago.")}
        </div>
      `;
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    prev.disabled = photoItems.length <= 1;
    next.disabled = photoItems.length <= 1;
    prev.addEventListener("click", () => {
      currentPhoto = (currentPhoto - 1 + photoItems.length) % photoItems.length;
      drawPhoto();
    });
    next.addEventListener("click", () => {
      currentPhoto = (currentPhoto + 1) % photoItems.length;
      drawPhoto();
    });
    drawPhoto();
  }

  function placeholder(stage, text) {
    return `
      <article class="photo-placeholder">
        <div class="placeholder-mark">+</div>
        <h3>${escapeHtml(stage)} photo slot</h3>
        <p>${escapeHtml(text)}</p>
        <p class="rest-meta">Add this later in <code>photoItems</code> inside <code>assets/js/app.js</code>.</p>
      </article>
    `;
  }

  function drawPhoto() {
    const photo = photoItems[currentPhoto];
    $("#photoCarousel").innerHTML = `
      <div class="photo-showcase">
        <figure class="photo-slide">
          <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.caption)}">
          <figcaption class="photo-caption">
            <b>${escapeHtml(photo.caption)}</b>
            <p class="rest-meta">${escapeHtml([photo.stage, photo.date, photo.location].filter(Boolean).join(" - "))}</p>
          </figcaption>
        </figure>
        <div class="photo-thumbs" aria-label="Photo thumbnails">
          ${photoItems.map((item, index) => thumb(item, index)).join("")}
        </div>
      </div>
    `;

    document.querySelectorAll(".photo-thumb").forEach((button) => {
      button.addEventListener("click", () => {
        currentPhoto = Number(button.dataset.index);
        drawPhoto();
      });
    });
  }

  function thumb(photo, index) {
    return `
      <button class="photo-thumb ${index === currentPhoto ? "active" : ""}" type="button" data-index="${index}" aria-label="Show ${escapeHtml(photo.caption)}">
        <img src="${escapeHtml(photo.src)}" alt="" loading="lazy">
      </button>
    `;
  }

  function renderProvenance() {
    $("#provenanceText").textContent = `${data.summary.timeNote} Source files: ${data.provenance.sourceGpx} and ${data.provenance.sourceNarrative}. The map displays ${fmt(data.provenance.routePointsDisplayed)} generated route points from ${fmt(data.provenance.routePointsOriginal)} original GPX points. ${data.provenance.waypointPolicy}`;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
