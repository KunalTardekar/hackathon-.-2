/**
 * ChronosFlow — Smart AI Day & Timetable Planner
 * Core Application Engine & Scheduler
 */

// ==========================================
// 1. DATA MODELS & INITIAL STATE
// ==========================================

const STORAGE_KEY = 'chronosflow_slots_v1';
const CHRONO_KEY = 'chronosflow_chronotype';
const THEME_KEY = 'chronosflow_theme';

// Initial Demo Timetable (College & Self-Study Schedule)
const DEFAULT_SLOTS = [
  // Monday
  { id: 'm1', day: 'Mon', title: 'Data Structures & Algorithms', category: 'ACADEMIC', startTime: '09:00', endTime: '10:30', priority: 'HIGH', location: 'LH-201', notes: 'Trees and Graph Traversal algorithms', completed: false },
  { id: 'm2', day: 'Mon', title: 'Database Management Systems', category: 'ACADEMIC', startTime: '11:00', endTime: '12:30', priority: 'NORMAL', location: 'Lab 4', notes: 'SQL Indexing & Normalization practice', completed: false },
  { id: 'm3', day: 'Mon', title: 'Lunch & Campus Walk', category: 'ROUTINE', startTime: '12:30', endTime: '13:30', priority: 'NORMAL', location: 'Cafeteria', notes: 'Recharge & hydrate', completed: true },
  { id: 'm4', day: 'Mon', title: 'Web Development Project Sprint', category: 'STUDY', startTime: '14:30', endTime: '16:30', priority: 'HIGH', location: 'Library 2F', notes: 'Build responsive components & API integration', completed: false },
  { id: 'm5', day: 'Mon', title: 'Gym & Cardio Routine', category: 'HEALTH', startTime: '18:00', endTime: '19:15', priority: 'NORMAL', location: 'Fitness Center', notes: 'Upper body & 20 min cycling', completed: false },

  // Tuesday
  { id: 't1', day: 'Tue', title: 'Operating Systems & Concurrency', category: 'ACADEMIC', startTime: '09:00', endTime: '10:30', priority: 'HIGH', location: 'LH-105', notes: 'Process scheduling & Mutex locks', completed: false },
  { id: 't2', day: 'Tue', title: 'Computer Networks Lecture', category: 'ACADEMIC', startTime: '11:00', endTime: '12:30', priority: 'NORMAL', location: 'LH-302', notes: 'TCP/IP socket architecture', completed: false },
  { id: 't3', day: 'Tue', title: 'LeetCode Problem Solving', category: 'STUDY', startTime: '15:00', endTime: '17:00', priority: 'HIGH', location: 'Hostel Room', notes: 'Solve 3 Medium Binary Search questions', completed: false },

  // Wednesday
  { id: 'w1', day: 'Wed', title: 'Object Oriented Programming (Java)', category: 'ACADEMIC', startTime: '09:30', endTime: '11:00', priority: 'NORMAL', location: 'Lab 2', notes: 'Design patterns and Polymorphism', completed: false },
  { id: 'w2', day: 'Wed', title: 'Discrete Mathematics Seminar', category: 'ACADEMIC', startTime: '11:30', endTime: '13:00', priority: 'NORMAL', location: 'Auditorium', notes: 'Graph theory proofs and recurrence', completed: false },
  { id: 'w3', day: 'Wed', title: 'Full Stack App Deployment', category: 'STUDY', startTime: '15:30', endTime: '17:30', priority: 'HIGH', location: 'Workspace', notes: 'Containerize and publish live demo', completed: false },

  // Thursday
  { id: 'th1', day: 'Thu', title: 'Software Engineering & Agile', category: 'ACADEMIC', startTime: '09:00', endTime: '10:30', priority: 'NORMAL', location: 'LH-203', notes: 'Scrum sprint reviews & QA pipelines', completed: false },
  { id: 'th2', day: 'Thu', title: 'Algorithms Revision & Quiz Prep', category: 'STUDY', startTime: '14:00', endTime: '16:00', priority: 'HIGH', location: 'Central Library', notes: 'Dynamic programming memoization tables', completed: false },
  { id: 'th3', day: 'Thu', title: 'Evening Jogging & Stretching', category: 'HEALTH', startTime: '18:00', endTime: '19:00', priority: 'NORMAL', location: 'Campus Track', notes: '5k run + core mobility exercises', completed: false },

  // Friday
  { id: 'f1', day: 'Fri', title: 'Cloud Computing & DevOps Lab', category: 'ACADEMIC', startTime: '10:00', endTime: '12:30', priority: 'HIGH', location: 'Cloud Lab', notes: 'AWS Lambda and CI/CD pipelines', completed: false },
  { id: 'f2', day: 'Fri', title: 'Hackathon Project Review & Polishing', category: 'STUDY', startTime: '14:00', endTime: '16:30', priority: 'URGENT', location: 'Innovation Hub', notes: 'Final code check, presentation slide deck', completed: false },

  // Saturday (Active Demo Showcase)
  { id: 's1', day: 'Sat', title: 'Morning Routine & Daily Strategy', category: 'ROUTINE', startTime: '08:00', endTime: '08:45', priority: 'NORMAL', location: 'Home', notes: 'Review goals, healthy breakfast, hydration', completed: true },
  { id: 's2', day: 'Sat', title: 'Webathon 2026 Live Build Sprint', category: 'STUDY', startTime: '09:00', endTime: '11:30', priority: 'URGENT', location: 'Lab 1 / Venue', notes: 'Implement smart scheduler logic & interactive UI', completed: true },
  { id: 's3', day: 'Sat', title: 'Nutritional Lunch & Break', category: 'ROUTINE', startTime: '12:00', endTime: '13:00', priority: 'NORMAL', location: 'Dining Hall', notes: 'Screen break & mind refresh', completed: true },
  { id: 's4', day: 'Sat', title: 'Data Structures Problem Practice', category: 'STUDY', startTime: '14:00', endTime: '15:30', priority: 'HIGH', location: 'Study Desk', notes: 'Revise Heap & Trie data structures', completed: false },
  { id: 's5', day: 'Sat', title: 'System Architecture Review', category: 'STUDY', startTime: '16:00', endTime: '17:15', priority: 'NORMAL', location: 'Library', notes: 'Read client-side storage & scheduling specs', completed: false },
  { id: 's6', day: 'Sat', title: 'Strength Training Workout', category: 'HEALTH', startTime: '18:00', endTime: '19:15', priority: 'NORMAL', location: 'Gym', notes: 'Push day + core mobility warmup', completed: false },
  { id: 's7', day: 'Sat', title: 'Project Demo Pitch Prep', category: 'PERSONAL', startTime: '20:30', endTime: '21:30', priority: 'HIGH', location: 'Workspace', notes: 'Rehearse 30-sec pitch for judges', completed: false },

  // Sunday
  { id: 'su1', day: 'Sun', title: 'Weekly Reset & Planning', category: 'ROUTINE', startTime: '10:00', endTime: '11:30', priority: 'NORMAL', location: 'Workspace', notes: 'Organize notes, prepare weekly timetable', completed: false },
  { id: 'su2', day: 'Sun', title: 'Open Source Exploration', category: 'STUDY', startTime: '14:00', endTime: '16:30', priority: 'NORMAL', location: 'Desk', notes: 'Read clean architecture guides', completed: false }
];

// App State
const state = {
  slots: [],
  selectedDay: 'Sat', // Default to active day
  categoryFilter: 'ALL',
  searchQuery: '',
  chronotype: 'earlyBird', // earlyBird | nightOwl
  viewMode: 'timeline', // timeline | matrix
  theme: 'dark',
  timer: {
    duration: 25 * 60,
    remaining: 25 * 60,
    intervalId: null,
    isRunning: false,
    taskTitle: 'Webathon Focus Sprint'
  },
  audioCtx: null,
  ambientNode: null,
  ambientSource: null,
  ambientType: 'none'
};

// ==========================================
// 2. HELPER UTILITIES
// ==========================================

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function format12Hour(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
}

function getDurationInHours(startTime, endTime) {
  const diffMins = timeToMinutes(endTime) - timeToMinutes(startTime);
  return (diffMins / 60).toFixed(1);
}

function getCategoryConfig(category) {
  const configs = {
    ACADEMIC: { label: 'Lecture', bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/30', dot: 'bg-indigo-500', icon: '📚' },
    STUDY: { label: 'Deep Work', bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-500', icon: '⚡' },
    HEALTH: { label: 'Health/Gym', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-500', icon: '💪' },
    ROUTINE: { label: 'Routine/Break', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-500', icon: '☕' },
    PERSONAL: { label: 'Personal', bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30', dot: 'bg-cyan-500', icon: '🌟' }
  };
  return configs[category] || configs.STUDY;
}

function getPriorityBadge(priority) {
  if (priority === 'URGENT') return '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">🚨 Urgent</span>';
  if (priority === 'HIGH') return '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">High</span>';
  if (priority === 'OPTIONAL') return '<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">Optional</span>';
  return '<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">Normal</span>';
}

// ==========================================
// 3. STORAGE & PERSISTENCE
// ==========================================

function loadState() {
  try {
    const rawSlots = localStorage.getItem(STORAGE_KEY);
    if (rawSlots) {
      state.slots = JSON.parse(rawSlots);
    } else {
      state.slots = [...DEFAULT_SLOTS];
      saveSlots();
    }

    const savedChrono = localStorage.getItem(CHRONO_KEY);
    if (savedChrono) state.chronotype = savedChrono;

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      state.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    state.slots = [...DEFAULT_SLOTS];
  }
}

function saveSlots() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.slots));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// ==========================================
// 4. AUDIO SYNTHESIZER (100% Client-Side Web Audio API)
// ==========================================

function initAudio() {
  if (!state.audioCtx) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (AudioCtxClass) {
      state.audioCtx = new AudioCtxClass();
    }
  }
  if (state.audioCtx && state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

// Synthesize pleasant completion chime
function playChimeSound() {
  try {
    initAudio();
    if (!state.audioCtx) return;
    const ctx = state.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  } catch (e) {
    console.log('Audio chime error:', e);
  }
}

// Ambient Noise Generator (Rain, White Noise, Binaural Beats)
function setAmbientSound(type) {
  try {
    initAudio();
    stopAmbientSound();
    state.ambientType = type;

    if (!state.audioCtx || type === 'none') return;

    const ctx = state.audioCtx;

    if (type === 'whitenoise') {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.value = 0.05;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      state.ambientSource = noise;
      state.ambientNode = gain;
    } else if (type === 'rain') {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 800;
      filter.Q.value = 1.0;

      const gain = ctx.createGain();
      gain.gain.value = 0.12;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      state.ambientSource = noise;
      state.ambientNode = gain;
    } else if (type === 'binaural') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const merger = ctx.createChannelMerger(2);
      const gain = ctx.createGain();

      osc1.frequency.value = 432; // Base frequency
      osc2.frequency.value = 440; // 8Hz alpha wave difference

      osc1.connect(merger, 0, 0);
      osc2.connect(merger, 0, 1);
      merger.connect(gain);

      gain.gain.value = 0.06;
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      state.ambientSource = {
        stop: () => {
          try {
            osc1.stop();
            osc2.stop();
          } catch (e) {}
        }
      };
      state.ambientNode = gain;
    }
    showToast(`Ambient audio: ${type.toUpperCase()} active`, 'info');
  } catch (err) {
    console.error('Ambient audio error:', err);
  }
}

function stopAmbientSound() {
  if (state.ambientSource) {
    try {
      state.ambientSource.stop();
    } catch (e) {}
    state.ambientSource = null;
  }
}

// ==========================================
// 5. TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-slate-900 border-emerald-500/40 text-emerald-300',
    info: 'bg-slate-900 border-indigo-500/40 text-indigo-300',
    warning: 'bg-slate-900 border-amber-500/40 text-amber-300',
    error: 'bg-slate-900 border-rose-500/40 text-rose-300'
  };

  const icons = {
    success: '✓',
    info: 'ℹ',
    warning: '⚠',
    error: '✕'
  };

  toast.className = `p-3 rounded-xl border shadow-xl flex items-center gap-2.5 text-xs font-semibold pointer-events-auto toast-animate ${bgColors[type] || bgColors.success}`;
  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] shrink-0">${icons[type]}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 6. SCHEDULER & CONFLICT DETECTION
// ==========================================

function getSortedDaySlots(day) {
  return state.slots
    .filter(slot => slot.day === day)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
}

function detectConflicts(daySlots) {
  const conflicts = [];
  for (let i = 0; i < daySlots.length - 1; i++) {
    const cur = daySlots[i];
    const next = daySlots[i + 1];
    if (timeToMinutes(cur.endTime) > timeToMinutes(next.startTime)) {
      conflicts.push({ slotA: cur, slotB: next });
    }
  }
  return conflicts;
}

// Compute free time gaps between scheduled commitments
function getFreeGaps(daySlots, dayStart = '08:00', dayEnd = '22:00') {
  const gaps = [];
  const startMins = timeToMinutes(dayStart);
  const endMins = timeToMinutes(dayEnd);

  if (daySlots.length === 0) {
    gaps.push({ startTime: dayStart, endTime: dayEnd, durationMinutes: endMins - startMins });
    return gaps;
  }

  // Gap before first slot
  const firstMins = timeToMinutes(daySlots[0].startTime);
  if (firstMins > startMins + 15) {
    gaps.push({
      startTime: dayStart,
      endTime: daySlots[0].startTime,
      durationMinutes: firstMins - startMins
    });
  }

  // Intermediate gaps
  for (let i = 0; i < daySlots.length - 1; i++) {
    const curEnd = timeToMinutes(daySlots[i].endTime);
    const nextStart = timeToMinutes(daySlots[i + 1].startTime);
    if (nextStart - curEnd >= 20) {
      gaps.push({
        startTime: daySlots[i].endTime,
        endTime: daySlots[i + 1].startTime,
        durationMinutes: nextStart - curEnd
      });
    }
  }

  // Gap after last slot
  const lastEnd = timeToMinutes(daySlots[daySlots.length - 1].endTime);
  if (endMins - lastEnd >= 30) {
    gaps.push({
      startTime: daySlots[daySlots.length - 1].endTime,
      endTime: dayEnd,
      durationMinutes: endMins - lastEnd
    });
  }

  return gaps;
}

// AI Auto-Scheduler Algorithm: Auto-fits a task into the best free buffer gap
function autoScheduleTask(title, durationMinutes, priority, energy, targetDay = state.selectedDay) {
  const daySlots = getSortedDaySlots(targetDay);
  const gaps = getFreeGaps(daySlots);

  // Find gaps that can fit this task
  const fittingGaps = gaps.filter(gap => gap.durationMinutes >= durationMinutes);

  if (fittingGaps.length === 0) {
    showToast(`No free gap available for ${durationMinutes} mins on ${targetDay}! Try freeing up a slot.`, 'error');
    return false;
  }

  // Pick optimal gap according to chronotype and energy
  let chosenGap = fittingGaps[0];
  if (energy === 'DEEP_WORK') {
    // Early birds prefer morning gaps (before 13:00)
    if (state.chronotype === 'earlyBird') {
      const morningGap = fittingGaps.find(g => timeToMinutes(g.startTime) < 780);
      if (morningGap) chosenGap = morningGap;
    } else {
      // Night owls prefer afternoon/evening
      const pmGap = fittingGaps.find(g => timeToMinutes(g.startTime) >= 840);
      if (pmGap) chosenGap = pmGap;
    }
  }

  const startMins = timeToMinutes(chosenGap.startTime);
  const endMins = startMins + Number(durationMinutes);
  const newStartTime = minutesToTime(startMins);
  const newEndTime = minutesToTime(endMins);

  const newSlot = {
    id: 'auto_' + Date.now(),
    day: targetDay,
    title: title,
    category: energy === 'DEEP_WORK' ? 'STUDY' : (energy === 'CREATIVE' ? 'PERSONAL' : 'ROUTINE'),
    startTime: newStartTime,
    endTime: newEndTime,
    priority: priority || 'HIGH',
    location: 'Study Station',
    notes: `AI Auto-Scheduled for peak ${state.chronotype === 'earlyBird' ? 'morning focus' : 'evening focus'}.`,
    completed: false
  };

  state.slots.push(newSlot);
  saveSlots();
  renderApp();
  playChimeSound();
  showToast(`Auto-fitted "${title}" into ${format12Hour(newStartTime)} - ${format12Hour(newEndTime)}!`, 'success');
  return true;
}

// Auto-Plan Strategy: Automatically balances and populates empty gaps in current day
function runAutoPlanStrategy(strategy = 'balanced') {
  const day = state.selectedDay;
  const daySlots = getSortedDaySlots(day);
  const gaps = getFreeGaps(daySlots);

  if (gaps.length === 0) {
    showToast(`Your schedule for ${day} is already tightly packed!`, 'warning');
    return;
  }

  const studyTasks = [
    { title: 'Algorithms & Code Optimization', duration: 60, category: 'STUDY', priority: 'HIGH' },
    { title: 'Course Notes Revision & Flashcards', duration: 45, category: 'STUDY', priority: 'NORMAL' },
    { title: 'Project Feature Debugging', duration: 60, category: 'PERSONAL', priority: 'HIGH' },
    { title: 'Mindfulness & Hydration Walk', duration: 30, category: 'HEALTH', priority: 'NORMAL' }
  ];

  let addedCount = 0;
  for (const gap of gaps) {
    if (gap.durationMinutes >= 45) {
      const taskPreset = studyTasks[addedCount % studyTasks.length];
      const taskDuration = Math.min(gap.durationMinutes, taskPreset.duration);
      const startMins = timeToMinutes(gap.startTime);
      const endMins = startMins + taskDuration;

      const newSlot = {
        id: 'auto_plan_' + Math.random().toString(36).substr(2, 9),
        day: day,
        title: taskPreset.title,
        category: strategy === 'examSprint' ? 'STUDY' : taskPreset.category,
        startTime: gap.startTime,
        endTime: minutesToTime(endMins),
        priority: strategy === 'examSprint' ? 'URGENT' : taskPreset.priority,
        location: 'Focus Space',
        notes: `Auto-planned via ${strategy === 'examSprint' ? 'Exam Sprint' : 'Balanced Flow'} optimizer`,
        completed: false
      };

      state.slots.push(newSlot);
      addedCount++;
    }
  }

  saveSlots();
  renderApp();
  playChimeSound();
  showToast(`Auto-Planner optimized ${day} with ${addedCount} smart sessions!`, 'success');
}

// ==========================================
// 7. RENDERING LOGIC
// ==========================================

function renderTimeline() {
  const container = document.getElementById('slotsList');
  const emptyState = document.getElementById('emptyStateContainer');
  const header = document.getElementById('currentDayHeader');
  const countBadge = document.getElementById('activeSlotCountBadge');

  if (!container) return;

  const dayNames = {
    Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday',
    Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
  };

  header.innerHTML = `<span>${dayNames[state.selectedDay]}'s Schedule</span>`;

  let daySlots = getSortedDaySlots(state.selectedDay);

  // Apply Category Filter
  if (state.categoryFilter !== 'ALL') {
    daySlots = daySlots.filter(s => s.category === state.categoryFilter);
  }

  // Apply Search Filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    daySlots = daySlots.filter(s =>
      s.title.toLowerCase().includes(q) ||
      (s.notes && s.notes.toLowerCase().includes(q)) ||
      (s.location && s.location.toLowerCase().includes(q)) ||
      s.category.toLowerCase().includes(q)
    );
  }

  countBadge.textContent = `${daySlots.length} ${daySlots.length === 1 ? 'slot' : 'slots'}`;

  // Check conflicts
  const conflicts = detectConflicts(getSortedDaySlots(state.selectedDay));
  const conflictBanner = document.getElementById('conflictAlertBanner');
  const conflictText = document.getElementById('conflictAlertText');
  if (conflicts.length > 0) {
    conflictBanner.classList.remove('hidden');
    conflictText.textContent = `Warning: "${conflicts[0].slotA.title}" overlaps with "${conflicts[0].slotB.title}"!`;
  } else {
    conflictBanner.classList.add('hidden');
  }

  if (daySlots.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  let html = '';
  const now = new Date();
  const currentHourMins = now.getHours() * 60 + now.getMinutes();

  daySlots.forEach((slot, index) => {
    const cat = getCategoryConfig(slot.category);
    const startMins = timeToMinutes(slot.startTime);
    const endMins = timeToMinutes(slot.endTime);
    const isCurrentActive = currentHourMins >= startMins && currentHourMins <= endMins && state.selectedDay === 'Sat';

    const durationText = getDurationInHours(slot.startTime, slot.endTime);

    // Free Gap indicator before this slot if applicable
    if (index > 0 && state.categoryFilter === 'ALL' && !state.searchQuery) {
      const prevSlot = daySlots[index - 1];
      const gapMins = startMins - timeToMinutes(prevSlot.endTime);
      if (gapMins >= 20) {
        html += `
          <div class="my-2 p-2.5 rounded-lg border border-dashed border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span><strong>Free Buffer Gap:</strong> ${gapMins} mins available (${format12Hour(prevSlot.endTime)} – ${format12Hour(slot.startTime)})</span>
            </div>
            <button onclick="quickFillGap('${prevSlot.endTime}', '${slot.startTime}')" class="px-2.5 py-1 rounded bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 text-[11px] font-semibold border border-indigo-500/30 transition">
              + Fill Gap
            </button>
          </div>
        `;
      }
    }

    html += `
      <div data-id="${slot.id}" class="slot-card p-4 rounded-xl border ${slot.completed ? 'bg-slate-900/40 border-slate-800/80 opacity-70' : (isCurrentActive ? 'bg-indigo-950/30 border-indigo-500/60 shadow-lg shadow-indigo-500/10 glow-active' : 'bg-slate-900/80 border-slate-800')} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        <!-- Left: Status Checkbox & Content -->
        <div class="flex items-start gap-3.5 flex-1 min-w-0">
          
          <!-- Complete Toggle Checkbox -->
          <button onclick="toggleSlotComplete('${slot.id}')" title="${slot.completed ? 'Mark incomplete' : 'Mark complete'}" class="mt-0.5 w-5 h-5 rounded-md border ${slot.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 hover:border-indigo-400 bg-slate-800/80'} flex items-center justify-center shrink-0 transition">
            ${slot.completed ? '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : ''}
          </button>

          <!-- Slot Info -->
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold ${cat.bg} ${cat.text} border ${cat.border} flex items-center gap-1">
                <span>${cat.icon}</span>
                <span>${cat.label}</span>
              </span>
              ${getPriorityBadge(slot.priority)}
              ${isCurrentActive ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">● HAPPENING NOW</span>' : ''}
              ${slot.location ? `<span class="text-[11px] text-slate-400 flex items-center gap-1"><svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>${slot.location}</span>` : ''}
            </div>

            <h4 class="text-sm font-semibold ${slot.completed ? 'line-through text-slate-400' : 'text-slate-100'} truncate">
              ${escapeHtml(slot.title)}
            </h4>

            ${slot.notes ? `<p class="text-xs text-slate-400 mt-0.5 line-clamp-1">${escapeHtml(slot.notes)}</p>` : ''}
          </div>

        </div>

        <!-- Right: Time & Actions -->
        <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">
          
          <!-- Time Badge -->
          <div class="text-right">
            <div class="text-xs font-mono font-bold text-slate-200">${format12Hour(slot.startTime)} – ${format12Hour(slot.endTime)}</div>
            <div class="text-[11px] text-slate-500">${durationText} hrs</div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex items-center gap-1 border-l border-slate-800 pl-2">
            
            <!-- Focus In Pomodoro Button -->
            <button onclick="startFocusOnSlot('${slot.id}')" title="Start Focus timer on this task" class="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </button>

            <!-- Edit Button -->
            <button onclick="openEditSlotModal('${slot.id}')" title="Edit commitment" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>

            <!-- Delete Button -->
            <button onclick="deleteSlot('${slot.id}')" title="Delete slot" class="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>

          </div>

        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

function renderWeeklyMatrix() {
  const tableBody = document.getElementById('matrixTableBody');
  if (!tableBody) return;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  let rowsHtml = '';

  hours.forEach(hour => {
    const hourMins = timeToMinutes(hour);
    rowsHtml += `<tr class="hover:bg-slate-900/50 transition">`;
    rowsHtml += `<td class="py-2 px-2 text-center text-slate-400 font-mono text-[11px] border-r border-slate-800">${format12Hour(hour)}</td>`;

    days.forEach(day => {
      // Find slots that intersect with this hour
      const matchingSlot = state.slots.find(s => {
        if (s.day !== day) return false;
        const sStart = timeToMinutes(s.startTime);
        const sEnd = timeToMinutes(s.endTime);
        return hourMins >= sStart && hourMins < sEnd;
      });

      if (matchingSlot) {
        const cat = getCategoryConfig(matchingSlot.category);
        rowsHtml += `
          <td class="p-1.5 border-r border-slate-800/60 align-top">
            <div onclick="openEditSlotModal('${matchingSlot.id}')" class="p-1.5 rounded-md ${cat.bg} ${cat.border} border text-[11px] cursor-pointer hover:scale-[1.02] transition">
              <p class="font-bold ${cat.text} truncate">${escapeHtml(matchingSlot.title)}</p>
              <p class="text-[10px] text-slate-400 font-mono">${matchingSlot.startTime}-${matchingSlot.endTime}</p>
            </div>
          </td>
        `;
      } else {
        rowsHtml += `
          <td class="p-1 border-r border-slate-800/60 text-center">
            <button onclick="quickAddSlotAt('${day}', '${hour}')" class="w-full h-8 rounded hover:bg-indigo-600/10 text-slate-600 hover:text-indigo-400 text-xs font-bold transition">
              +
            </button>
          </td>
        `;
      }
    });

    rowsHtml += `</tr>`;
  });

  tableBody.innerHTML = rowsHtml;
}

function updateStats() {
  const daySlots = state.slots.filter(s => s.day === state.selectedDay);

  let totalMins = 0;
  let focusMins = 0;
  let completedCount = 0;

  const categoryMins = {
    ACADEMIC: 0,
    STUDY: 0,
    HEALTH: 0,
    ROUTINE: 0,
    PERSONAL: 0
  };

  daySlots.forEach(s => {
    const dur = Math.max(0, timeToMinutes(s.endTime) - timeToMinutes(s.startTime));
    totalMins += dur;
    if (s.category === 'STUDY' || s.category === 'ACADEMIC') focusMins += dur;
    if (s.completed) completedCount++;
    if (categoryMins[s.category] !== undefined) categoryMins[s.category] += dur;
  });

  const totalHours = (totalMins / 60).toFixed(1);
  const focusHours = (focusMins / 60).toFixed(1);
  const freeMins = Math.max(0, 14 * 60 - totalMins); // Active day span 08:00 to 22:00 = 14 hours
  const freeHours = (freeMins / 60).toFixed(1);

  const percentCompleted = daySlots.length > 0 ? Math.round((completedCount / daySlots.length) * 100) : 0;

  document.getElementById('statTotalHours').textContent = `${totalHours} hrs`;
  document.getElementById('statSlotsCount').textContent = `${daySlots.length} active commitments`;
  document.getElementById('statFocusHours').textContent = `${focusHours} hrs`;
  document.getElementById('statFreeHours').textContent = `${freeHours} hrs`;
  document.getElementById('statProgressPercent').textContent = `${percentCompleted}%`;
  document.getElementById('statCompletedRatio').textContent = `${completedCount} / ${daySlots.length} done`;
  document.getElementById('statProgressBar').style.width = `${percentCompleted}%`;

  // Update Category Proportion Bar & Legend
  const totalChartMins = totalMins || 1;
  const pAcademic = Math.round((categoryMins.ACADEMIC / totalChartMins) * 100);
  const pStudy = Math.round(((categoryMins.STUDY + categoryMins.PERSONAL) / totalChartMins) * 100);
  const pHealth = Math.round((categoryMins.HEALTH / totalChartMins) * 100);
  const pRoutine = Math.round((categoryMins.ROUTINE / totalChartMins) * 100);

  document.getElementById('barAcademic').style.width = `${pAcademic}%`;
  document.getElementById('barStudy').style.width = `${pStudy}%`;
  document.getElementById('barHealth').style.width = `${pHealth}%`;
  document.getElementById('barRoutine').style.width = `${pRoutine}%`;

  document.getElementById('legendAcademic').textContent = `${(categoryMins.ACADEMIC / 60).toFixed(1)}h`;
  document.getElementById('legendStudy').textContent = `${((categoryMins.STUDY + categoryMins.PERSONAL) / 60).toFixed(1)}h`;
  document.getElementById('legendHealth').textContent = `${(categoryMins.HEALTH / 60).toFixed(1)}h`;
  document.getElementById('legendRoutine').textContent = `${(categoryMins.ROUTINE / 60).toFixed(1)}h`;

  // Update Energy Alignment Insight
  const energyLabel = document.getElementById('energyScoreLabel');
  const energyText = document.getElementById('energyInsightText');
  if (state.chronotype === 'earlyBird') {
    energyLabel.textContent = '94% Optimal';
    energyText.textContent = 'Morning high-cognition slots are well matched to your peak stamina.';
  } else {
    energyLabel.textContent = '91% Optimal';
    energyText.textContent = 'Afternoon and evening blocks are prioritized for deep flow & coding.';
  }

  // Update Auto-plan Modal Info
  const autoPlanDayText = document.getElementById('autoPlanDayText');
  const autoPlanGaps = document.getElementById('autoPlanFreeWindowsCount');
  const autoPlanFixed = document.getElementById('autoPlanFixedCount');
  if (autoPlanDayText) autoPlanDayText.textContent = state.selectedDay;
  if (autoPlanGaps) autoPlanGaps.textContent = `${getFreeGaps(getSortedDaySlots(state.selectedDay)).length} gaps (${freeHours} hrs)`;
  if (autoPlanFixed) autoPlanFixed.textContent = `${daySlots.length} slots`;
}

function renderApp() {
  renderTimeline();
  renderWeeklyMatrix();
  updateStats();
}

// ==========================================
// 8. FOCUS / POMODORO TIMER
// ==========================================

function updateTimerDisplay() {
  const display = document.getElementById('pomoDisplay');
  const circle = document.getElementById('timerProgressCircle');
  const taskLabel = document.getElementById('pomoTaskLabel');

  const m = Math.floor(state.timer.remaining / 60).toString().padStart(2, '0');
  const s = (state.timer.remaining % 60).toString().padStart(2, '0');
  display.textContent = `${m}:${s}`;
  taskLabel.textContent = state.timer.taskTitle;

  // Circle progress calculation (circumference is 2 * PI * 50 = 314.159)
  const total = state.timer.duration;
  const fraction = state.timer.remaining / total;
  const offset = 314.159 * (1 - fraction);
  circle.style.strokeDashoffset = offset;
}

function toggleTimer() {
  initAudio();
  if (state.timer.isRunning) {
    clearInterval(state.timer.intervalId);
    state.timer.isRunning = false;
    document.getElementById('pomoPlayIcon').classList.remove('hidden');
    document.getElementById('pomoPauseIcon').classList.add('hidden');
    document.getElementById('pomoToggleText').textContent = 'Resume';
  } else {
    state.timer.isRunning = true;
    document.getElementById('pomoPlayIcon').classList.add('hidden');
    document.getElementById('pomoPauseIcon').classList.remove('hidden');
    document.getElementById('pomoToggleText').textContent = 'Pause';

    state.timer.intervalId = setInterval(() => {
      if (state.timer.remaining > 0) {
        state.timer.remaining--;
        updateTimerDisplay();
      } else {
        clearInterval(state.timer.intervalId);
        state.timer.isRunning = false;
        playChimeSound();
        showToast(`🎉 Focus session completed: "${state.timer.taskTitle}"! Great job!`, 'success');
        resetTimer(state.timer.duration);
      }
    }, 1000);
  }
}

function resetTimer(seconds = 25 * 60) {
  if (state.timer.intervalId) clearInterval(state.timer.intervalId);
  state.timer.isRunning = false;
  state.timer.duration = seconds;
  state.timer.remaining = seconds;
  document.getElementById('pomoPlayIcon').classList.remove('hidden');
  document.getElementById('pomoPauseIcon').classList.add('hidden');
  document.getElementById('pomoToggleText').textContent = 'Start Session';
  updateTimerDisplay();
}

function startFocusOnSlot(slotId) {
  const slot = state.slots.find(s => s.id === slotId);
  if (!slot) return;

  state.timer.taskTitle = slot.title;
  resetTimer(25 * 60);
  toggleTimer();
  showToast(`Focus session started for: ${slot.title}`, 'info');

  // Smooth scroll to focus timer widget
  const focusWidget = document.getElementById('pomoDisplay');
  if (focusWidget) {
    focusWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ==========================================
// 9. EVENT LISTENERS & USER ACTIONS
// ==========================================

function toggleSlotComplete(id) {
  const slot = state.slots.find(s => s.id === id);
  if (!slot) return;
  slot.completed = !slot.completed;
  saveSlots();
  renderApp();
  if (slot.completed) {
    playChimeSound();
    showToast(`Completed: "${slot.title}"!`, 'success');
  }
}

function deleteSlot(id) {
  const slot = state.slots.find(s => s.id === id);
  if (!slot) return;
  state.slots = state.slots.filter(s => s.id !== id);
  saveSlots();
  renderApp();
  showToast(`Removed "${slot.title}"`, 'warning');
}

function openAddSlotModal(prefillDay = state.selectedDay, prefillStart = '10:00') {
  document.getElementById('modalTitle').textContent = 'Add Schedule Commitment';
  document.getElementById('editSlotId').value = '';
  document.getElementById('slotTitleInput').value = '';
  document.getElementById('slotDayInput').value = prefillDay;
  document.getElementById('slotCategoryInput').value = 'ACADEMIC';
  document.getElementById('slotStartTimeInput').value = prefillStart;

  const startMins = timeToMinutes(prefillStart);
  document.getElementById('slotEndTimeInput').value = minutesToTime(startMins + 60);

  document.getElementById('slotPriorityInput').value = 'NORMAL';
  document.getElementById('slotLocationInput').value = '';
  document.getElementById('slotNotesInput').value = '';

  document.getElementById('slotModal').classList.remove('hidden');
}

function openEditSlotModal(id) {
  const slot = state.slots.find(s => s.id === id);
  if (!slot) return;

  document.getElementById('modalTitle').textContent = 'Edit Schedule Commitment';
  document.getElementById('editSlotId').value = slot.id;
  document.getElementById('slotTitleInput').value = slot.title;
  document.getElementById('slotDayInput').value = slot.day;
  document.getElementById('slotCategoryInput').value = slot.category;
  document.getElementById('slotStartTimeInput').value = slot.startTime;
  document.getElementById('slotEndTimeInput').value = slot.endTime;
  document.getElementById('slotPriorityInput').value = slot.priority || 'NORMAL';
  document.getElementById('slotLocationInput').value = slot.location || '';
  document.getElementById('slotNotesInput').value = slot.notes || '';

  document.getElementById('slotModal').classList.remove('hidden');
}

function closeSlotModal() {
  document.getElementById('slotModal').classList.add('hidden');
}

function quickFillGap(gapStart, gapEnd) {
  openAddSlotModal(state.selectedDay, gapStart);
  document.getElementById('slotEndTimeInput').value = gapEnd;
}

function quickAddSlotAt(day, hour) {
  openAddSlotModal(day, hour);
}

// Export schedule to .ICS calendar format
function exportToIcal() {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ChronosFlow//Smart Day Planner//EN',
    'CALSCALE:GREGORIAN'
  ];

  state.slots.forEach(slot => {
    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`SUMMARY:${slot.title}`);
    icsContent.push(`DESCRIPTION:${slot.notes || slot.category}`);
    icsContent.push(`LOCATION:${slot.location || 'Campus'}`);
    icsContent.push(`DTSTART:20261017T${slot.startTime.replace(':', '')}00`);
    icsContent.push(`DTEND:20261017T${slot.endTime.replace(':', '')}00`);
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'chronosflow_schedule.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Exported calendar to .ICS file!', 'success');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// ==========================================
// 10. SETUP & INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Update live header date/time
  function updateClock() {
    const now = new Date();
    const dateOpts = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateEl = document.getElementById('currentDateDisplay');
    const timeEl = document.getElementById('currentTimeDisplay');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', dateOpts);
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Day Tab Switchers
  const dayTabs = document.querySelectorAll('.day-tab');
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => {
        t.classList.remove('bg-indigo-600', 'text-white', 'active');
        t.classList.add('text-slate-400');
      });
      tab.classList.add('bg-indigo-600', 'text-white', 'active');
      tab.classList.remove('text-slate-400');
      state.selectedDay = tab.getAttribute('data-day');
      renderApp();
    });
  });

  // View Switchers (Timeline vs Matrix)
  const viewTimelineBtn = document.getElementById('viewTimelineBtn');
  const viewMatrixBtn = document.getElementById('viewMatrixBtn');
  const timelineContainer = document.getElementById('timelineViewContainer');
  const matrixContainer = document.getElementById('weeklyMatrixContainer');

  viewTimelineBtn.addEventListener('click', () => {
    viewTimelineBtn.classList.add('bg-indigo-600', 'text-white');
    viewTimelineBtn.classList.remove('text-slate-400');
    viewMatrixBtn.classList.remove('bg-indigo-600', 'text-white');
    viewMatrixBtn.classList.add('text-slate-400');
    timelineContainer.classList.remove('hidden');
    matrixContainer.classList.add('hidden');
    state.viewMode = 'timeline';
  });

  viewMatrixBtn.addEventListener('click', () => {
    viewMatrixBtn.classList.add('bg-indigo-600', 'text-white');
    viewMatrixBtn.classList.remove('text-slate-400');
    viewTimelineBtn.classList.remove('bg-indigo-600', 'text-white');
    viewTimelineBtn.classList.add('text-slate-400');
    matrixContainer.classList.remove('hidden');
    timelineContainer.classList.add('hidden');
    state.viewMode = 'matrix';
    renderWeeklyMatrix();
  });

  // Category Filter Buttons
  const catButtons = document.querySelectorAll('.cat-filter-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => {
        b.className = 'cat-filter-btn px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-400 hover:text-white border border-transparent font-medium';
      });
      btn.className = 'cat-filter-btn px-2.5 py-1 rounded-md bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-medium';
      state.categoryFilter = btn.getAttribute('data-category');
      renderTimeline();
    });
  });

  // Search Input
  const searchInput = document.getElementById('slotSearchInput');
  searchInput.addEventListener('input', e => {
    state.searchQuery = e.target.value;
    renderTimeline();
  });

  // Chronotype Switcher
  const chronoBtn = document.getElementById('chronotypeToggleBtn');
  const chronoIcon = document.getElementById('chronotypeIcon');
  const chronoLabel = document.getElementById('chronotypeLabel');
  
  function applyChronotype(type) {
    state.chronotype = type;
    localStorage.setItem(CHRONO_KEY, type);
    if (type === 'earlyBird') {
      chronoIcon.textContent = '🌅';
      chronoLabel.textContent = 'Early Bird';
    } else {
      chronoIcon.textContent = '🌙';
      chronoLabel.textContent = 'Night Owl';
    }
    updateStats();
  }
  applyChronotype(state.chronotype);

  chronoBtn.addEventListener('click', () => {
    const next = state.chronotype === 'earlyBird' ? 'nightOwl' : 'earlyBird';
    applyChronotype(next);
    showToast(`Switched peak energy mode to ${next === 'earlyBird' ? 'Early Bird (Morning Focus)' : 'Night Owl (Evening Focus)'}!`, 'info');
  });

  // Theme Switcher
  const themeBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');

  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
  applyTheme(state.theme);

  themeBtn.addEventListener('click', () => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Modal Controls
  document.getElementById('openAddSlotBtn').addEventListener('click', () => openAddSlotModal());
  document.getElementById('closeSlotModalBtn').addEventListener('click', closeSlotModal);
  document.getElementById('cancelSlotBtn').addEventListener('click', closeSlotModal);

  // Form Submit: Add/Edit Slot
  document.getElementById('slotForm').addEventListener('submit', e => {
    e.preventDefault();
    const editId = document.getElementById('editSlotId').value;
    const title = document.getElementById('slotTitleInput').value.trim();
    const day = document.getElementById('slotDayInput').value;
    const category = document.getElementById('slotCategoryInput').value;
    const startTime = document.getElementById('slotStartTimeInput').value;
    const endTime = document.getElementById('slotEndTimeInput').value;
    const priority = document.getElementById('slotPriorityInput').value;
    const location = document.getElementById('slotLocationInput').value.trim();
    const notes = document.getElementById('slotNotesInput').value.trim();

    if (timeToMinutes(startTime) >= timeToMinutes(endTime)) {
      showToast('End time must be after start time!', 'error');
      return;
    }

    if (editId) {
      // Edit existing
      const slot = state.slots.find(s => s.id === editId);
      if (slot) {
        slot.title = title;
        slot.day = day;
        slot.category = category;
        slot.startTime = startTime;
        slot.endTime = endTime;
        slot.priority = priority;
        slot.location = location;
        slot.notes = notes;
      }
      showToast(`Updated "${title}"`, 'success');
    } else {
      // Add new
      const newSlot = {
        id: 'slot_' + Date.now(),
        title,
        day,
        category,
        startTime,
        endTime,
        priority,
        location,
        notes,
        completed: false
      };
      state.slots.push(newSlot);
      showToast(`Added "${title}" to ${day}!`, 'success');
    }

    saveSlots();
    closeSlotModal();
    state.selectedDay = day;

    // Sync day tabs UI
    dayTabs.forEach(t => {
      if (t.getAttribute('data-day') === day) {
        t.classList.add('bg-indigo-600', 'text-white', 'active');
        t.classList.remove('text-slate-400');
      } else {
        t.classList.remove('bg-indigo-600', 'text-white', 'active');
        t.classList.add('text-slate-400');
      }
    });

    renderApp();
  });

  // AI Quick Fit Form (Right Sidebar)
  document.getElementById('quickFitTaskForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('quickTaskTitle').value.trim();
    const duration = document.getElementById('quickTaskDuration').value;
    const priority = document.getElementById('quickTaskPriority').value;
    const energy = document.getElementById('quickTaskEnergy').value;

    const success = autoScheduleTask(title, duration, priority, energy);
    if (success) {
      document.getElementById('quickTaskTitle').value = '';
    }
  });

  // Auto-Plan Engine Modal
  const autoPlanModal = document.getElementById('autoPlanModal');
  document.getElementById('openAutoPlanBtn').addEventListener('click', () => {
    autoPlanModal.classList.remove('hidden');
    updateStats();
  });
  document.getElementById('quickFillGapsBtn').addEventListener('click', () => {
    autoPlanModal.classList.remove('hidden');
    updateStats();
  });
  document.getElementById('closeAutoPlanModalBtn').addEventListener('click', () => {
    autoPlanModal.classList.add('hidden');
  });
  document.getElementById('cancelAutoPlanBtn').addEventListener('click', () => {
    autoPlanModal.classList.add('hidden');
  });
  document.getElementById('executeAutoPlanBtn').addEventListener('click', () => {
    const strategy = document.querySelector('input[name="planStrategy"]:checked').value;
    autoPlanModal.classList.add('hidden');
    runAutoPlanStrategy(strategy);
  });

  // Pomodoro Controls
  document.getElementById('pomoToggleBtn').addEventListener('click', toggleTimer);
  document.getElementById('pomoResetBtn').addEventListener('click', () => resetTimer(state.timer.duration));

  document.getElementById('pomoPreset25').addEventListener('click', () => {
    resetTimer(25 * 60);
    showToast('Focus session set to 25 minutes', 'info');
  });
  document.getElementById('pomoPreset50').addEventListener('click', () => {
    resetTimer(50 * 60);
    showToast('Deep focus session set to 50 minutes', 'info');
  });
  document.getElementById('pomoPresetBreak').addEventListener('click', () => {
    resetTimer(5 * 60);
    showToast('Break session set to 5 minutes', 'info');
  });

  // Ambient Sound Selector
  document.getElementById('ambientSoundSelect').addEventListener('change', e => {
    setAmbientSound(e.target.value);
  });

  // Export & Utilities
  document.getElementById('exportIcalBtn').addEventListener('click', exportToIcal);
  document.getElementById('printPlanBtn').addEventListener('click', () => window.print());

  document.getElementById('resetDemoBtn').addEventListener('click', () => {
    if (confirm('Reset your timetable to the comprehensive sample college routine?')) {
      state.slots = [...DEFAULT_SLOTS];
      saveSlots();
      renderApp();
      showToast('Timetable reset to sample college routine!', 'success');
    }
  });

  document.getElementById('loadDefaultDemoBtn').addEventListener('click', () => {
    state.slots = [...DEFAULT_SLOTS];
    saveSlots();
    renderApp();
    showToast('Loaded demo college timetable!', 'success');
  });

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Clear all commitments from your schedule?')) {
      state.slots = [];
      saveSlots();
      renderApp();
      showToast('All slots cleared.', 'warning');
    }
  });

  // Conflict Banner Dismiss
  const dismissConflictBtn = document.getElementById('dismissConflictBtn');
  if (dismissConflictBtn) {
    dismissConflictBtn.addEventListener('click', () => {
      document.getElementById('conflictAlertBanner').classList.add('hidden');
    });
  }

  // Backdrop modal dismiss
  const slotModal = document.getElementById('slotModal');
  slotModal.addEventListener('click', e => {
    if (e.target === slotModal) closeSlotModal();
  });

  autoPlanModal.addEventListener('click', e => {
    if (e.target === autoPlanModal) autoPlanModal.classList.add('hidden');
  });

  // Escape key closes modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSlotModal();
      autoPlanModal.classList.add('hidden');
    }
  });

  // Initial App Render
  renderApp();
  updateTimerDisplay();
});

