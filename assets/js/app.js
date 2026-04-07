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
  let selectedProfileStage = null;

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

  function renderRouteFallback() {
    const target = $("#routeFallback");
    const profile = data.elevationProfile;
    if (!target || !profile?.length) return;

    const width = 980;
    const height = 470;
    const pad = { top: 54, right: 40, bottom: 64, left: 72 };
    const maxKm = Math.ceil(Math.max(...profile.map((point) => point[0])));
    const minEle = Math.floor((Math.min(...profile.map((point) => point[1])) - 25) / 50) * 50;
    const maxEle = Math.ceil((Math.max(...profile.map((point) => point[1])) + 25) / 50) * 50;
    const chartBottom = height - pad.bottom;
    const chartWidth = width - pad.left - pad.right;
    const chartHeight = height - pad.top - pad.bottom;
    const x = (km) => pad.left + (km / maxKm) * chartWidth;
    const y = (ele) => pad.top + ((maxEle - ele) / (maxEle - minEle)) * chartHeight;
    const byStage = groupProfileByStage(profile);

    const grid = makeRange(Math.ceil(minEle / 100) * 100, maxEle, 100)
      .map(
        (ele) => `
          <g>
            <line x1="${pad.left}" x2="${width - pad.right}" y1="${y(ele).toFixed(1)}" y2="${y(ele).toFixed(1)}" stroke="rgba(47,38,28,0.1)" stroke-dasharray="3 9"/>
            <text x="${pad.left - 12}" y="${(y(ele) + 4).toFixed(1)}" text-anchor="end" class="axis-label">${ele} m</text>
          </g>
        `
      )
      .join("");

    const kmTicks = [0, 25, 50, 75, 100, 125]
      .filter((km) => km <= maxKm)
      .map(
        (km) => `
          <g>
            <line x1="${x(km).toFixed(1)}" x2="${x(km).toFixed(1)}" y1="${pad.top}" y2="${chartBottom}" stroke="rgba(47,38,28,0.08)"/>
            <text x="${x(km).toFixed(1)}" y="${height - 27}" text-anchor="middle" class="axis-label">${km} km</text>
          </g>
        `
      )
      .join("");

    const stageAreas = data.stages
      .map((stage) => {
        const points = byStage[stage.day] || [];
        if (points.length < 2) return "";
        const dim = selectedProfileStage && selectedProfileStage !== stage.day;
        const first = points[0];
        const last = points[points.length - 1];
        const linePath = points
          .map((point, index) => `${index ? "L" : "M"} ${x(point[0]).toFixed(1)} ${y(point[1]).toFixed(1)}`)
          .join(" ");
        const areaPath = [
          `M ${x(first[0]).toFixed(1)} ${chartBottom}`,
          `L ${x(first[0]).toFixed(1)} ${y(first[1]).toFixed(1)}`,
          points
            .slice(1)
            .map((point) => `L ${x(point[0]).toFixed(1)} ${y(point[1]).toFixed(1)}`)
            .join(" "),
          `L ${x(last[0]).toFixed(1)} ${chartBottom}`,
          "Z",
        ].join(" ");

        return `
          <path d="${areaPath}" fill="${stage.color}" opacity="${dim ? "0.05" : "0.18"}"/>
          <path d="${linePath}" fill="none" stroke="${stage.color}" stroke-width="${dim ? "4" : "7"}" stroke-linecap="round" stroke-linejoin="round" opacity="${dim ? "0.22" : "1"}"/>
        `;
      })
      .join("");

    const poiMarkers = data.waypoints
      .filter((waypoint) => ["Start", "Sleep", "Summit", "Food", "Viewpoint", "Finish"].includes(waypoint.type))
      .map((waypoint, index) => renderPoiMarker(waypoint, index, x, y))
      .join("");

    const restMarkers = data.restEvents
      .filter((event) => event.durationMin >= 30)
      .map((event) => renderRestMarker(event, x, y))
      .join("");

    target.innerHTML = `
      <div class="profile-map-header">
        <div>
          <p class="eyebrow">Journey profile map</p>
          <h2>Five days, one rising and falling line.</h2>
        </div>
        <p>Colored by walking day. Tap a stage below to isolate it; tap again to reset.</p>
      </div>
      <svg class="fallback-svg profile-map-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Elevation journey map from Sarria to Santiago">
        <defs>
          <linearGradient id="profileSky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="#fff9ec"/>
            <stop offset="54%" stop-color="#f6e6c5"/>
            <stop offset="100%" stop-color="#e7c996"/>
          </linearGradient>
          <filter id="profileShadow" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#6f431a" flood-opacity="0.18"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="34" fill="url(#profileSky)"/>
        <text x="${pad.left}" y="34" class="profile-map-title">Sarria to Santiago de Compostela</text>
        <text x="${width - pad.right}" y="34" text-anchor="end" class="profile-map-note">${data.summary.narrativeDistanceKm.toFixed(1)} km - ${fmt(data.summary.steps)} steps</text>
        ${grid}
        ${kmTicks}
        <rect x="${pad.left}" y="${pad.top}" width="${chartWidth}" height="${chartHeight}" rx="22" fill="rgba(255,249,236,0.34)" stroke="rgba(47,38,28,0.1)"/>
        <g filter="url(#profileShadow)">
          ${stageAreas}
        </g>
        ${restMarkers}
        ${poiMarkers}
        <line x1="${pad.left}" x2="${width - pad.right}" y1="${chartBottom}" y2="${chartBottom}" stroke="rgba(47,38,28,0.28)" stroke-width="2"/>
        <text x="${pad.left}" y="${height - 8}" class="profile-map-note">Terrain profile from GPX samples - rest triangles show likely long pauses.</text>
      </svg>
      <div class="profile-stage-cards" aria-label="Highlight one Camino stage">
        ${data.stages.map(renderProfileStageCard).join("")}
      </div>
    `;

    (target.querySelectorAll?.(".profile-stage-card") || []).forEach((button) => {
      button.addEventListener("click", () => {
        const stage = Number(button.dataset.stage);
        selectedProfileStage = selectedProfileStage === stage ? null : stage;
        renderRouteFallback();
      });
    });
  }

  function groupProfileByStage(profile) {
    return profile.reduce((acc, point) => {
      const stage = point[2];
      acc[stage] ||= [];
      acc[stage].push(point);
      return acc;
    }, {});
  }

  function makeRange(start, end, step) {
    const range = [];
    for (let value = start; value <= end; value += step) range.push(value);
    return range;
  }

  function nearestProfilePoint(km) {
    return data.elevationProfile.reduce((nearest, point) =>
      Math.abs(point[0] - km) < Math.abs(nearest[0] - km) ? point : nearest
    );
  }

  function stageForKm(km) {
    let cumulativeKm = 0;
    for (const stage of data.stages) {
      cumulativeKm += stage.distanceKm;
      if (km <= cumulativeKm + 0.75) return stage.day;
    }
    return data.stages[data.stages.length - 1].day;
  }

  function cleanPoiLabel(waypoint) {
    return waypoint.name
      .replace(/^NIGHT \d - /, "")
      .replace("SANTIAGO DE COMPOSTELA - ", "")
      .replace(" - Start (Km 0)", "")
      .replace(" - 679m (ROUTE HIGH POINT)", "")
      .replace(" - Pulpería Ezequiel", "")
      .replace(" (Arca)", "");
  }

  function renderPoiMarker(waypoint, index, x, y) {
    const profilePoint = nearestProfilePoint(waypoint.routeKm);
    const markerStage = stageForKm(waypoint.routeKm);
    const px = x(waypoint.routeKm);
    const py = y(waypoint.type === "Summit" ? data.summary.highestPoint.elevationM : profilePoint[1]);
    const dim = selectedProfileStage && selectedProfileStage !== markerStage;
    const labelAbove = index % 2 === 0 || waypoint.type === "Summit" || waypoint.type === "Finish";
    const labelY = labelAbove ? py - 16 : py + 27;
    const labelAnchor = waypoint.type === "Finish" ? "end" : "start";
    const labelX = waypoint.type === "Finish" ? px - 12 : px + 12;
    const fill =
      waypoint.type === "Finish"
        ? "#436f95"
        : waypoint.type === "Start"
          ? "#597642"
          : waypoint.type === "Summit"
            ? "#b76034"
            : stageColor(markerStage);

    return `
      <g opacity="${dim ? "0.18" : "1"}">
        <title>${escapeHtml(cleanPoiLabel(waypoint))} - km ${waypoint.routeKm.toFixed(1)}</title>
        <line x1="${px.toFixed(1)}" x2="${px.toFixed(1)}" y1="${(py + 9).toFixed(1)}" y2="${labelAbove ? (labelY + 5).toFixed(1) : (labelY - 12).toFixed(1)}" stroke="rgba(47,38,28,0.28)" stroke-dasharray="2 5"/>
        <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${waypoint.type === "Sleep" ? "8" : "7"}" fill="${fill}" stroke="#fff9ec" stroke-width="4"/>
        <circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${waypoint.type === "Sleep" ? "8" : "7"}" fill="none" stroke="#2f261c" stroke-width="1.5"/>
        <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="${labelAnchor}" class="map-label">${escapeHtml(cleanPoiLabel(waypoint))}</text>
      </g>
    `;
  }

  function renderRestMarker(event, x, y) {
    const profilePoint = nearestProfilePoint(event.km);
    const px = x(event.km);
    const py = y(profilePoint[1]);
    const dim = selectedProfileStage && selectedProfileStage !== event.stage;

    return `
      <g opacity="${dim ? "0.12" : "0.92"}">
        <title>${escapeHtml(event.date)} rest - ${event.durationMin} min near ${event.near}</title>
        <path d="M ${(px - 8).toFixed(1)} ${(py - 22).toFixed(1)} L ${(px + 8).toFixed(1)} ${(py - 22).toFixed(1)} L ${px.toFixed(1)} ${(py - 6).toFixed(1)} Z" fill="#2f261c"/>
        <text x="${(px + 10).toFixed(1)}" y="${(py - 23).toFixed(1)}" class="profile-map-note">${Math.round(event.durationMin)}m rest</text>
      </g>
    `;
  }

  function renderProfileStageCard(stage) {
    const active = selectedProfileStage === stage.day;
    return `
      <button type="button" class="profile-stage-card ${active ? "active" : ""}" data-stage="${stage.day}" style="--stage-color:${stage.color}">
        <span>Day ${stage.day}</span>
        <b>${escapeHtml(stage.from)} to ${escapeHtml(stage.to)}</b>
        <small>${stage.distanceKm.toFixed(1)} km - +${fmt(stage.gainM)} m - ${escapeHtml(stage.badge)}</small>
      </button>
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
