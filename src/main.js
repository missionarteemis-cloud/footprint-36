const COUNTRY_GRID_FACTORS = {
  it: { label: 'Italia', electricityKgPerKwh: 0.311, heatingFallback: 'gas', heatingNote: 'Media 2024, sistema elettrico più carbon-intensive della media UE.' },
  fr: { label: 'Francia', electricityKgPerKwh: 0.022, heatingFallback: 'district', heatingNote: 'Rete 2024 molto bassa grazie a nucleare e idroelettrico.' },
  de: { label: 'Germania', electricityKgPerKwh: 0.363, heatingFallback: 'gas', heatingNote: 'Mix 2024 ancora più carbon-intensive della media UE.' },
  es: { label: 'Spagna', electricityKgPerKwh: 0.108, heatingFallback: 'heatpump', heatingNote: 'Mix 2024 relativamente pulito grazie a eolico e solare.' },
  uk: { label: 'Regno Unito', electricityKgPerKwh: 0.124, heatingFallback: 'gas', heatingNote: 'Rete 2024 in forte discesa, gas ancora frequente in casa.' },
  us: { label: 'Stati Uniti', electricityKgPerKwh: 0.384, heatingFallback: 'gas', heatingNote: 'Media nazionale 2024, indicativa e molto variabile per stato.' },
  eu: { label: 'Media UE', electricityKgPerKwh: 0.175, heatingFallback: 'gas', heatingNote: 'Fallback europeo 2024 per stime meno precise.' },
  world: { label: 'Media mondo', electricityKgPerKwh: 0.445, heatingFallback: 'gas', heatingNote: 'Riferimento globale 2024, usato solo come confronto.' }
}

const questions = [
  {
    key: 'country',
    label: 'In quale paese vivi principalmente?',
    type: 'select',
    defaultValue: 'it',
    group: 'Casa',
    options: [
      ['it', 'Italia'],
      ['fr', 'Francia'],
      ['de', 'Germania'],
      ['es', 'Spagna'],
      ['uk', 'Regno Unito'],
      ['us', 'Stati Uniti'],
      ['eu', 'Altro / media UE']
    ]
  },
  {
    key: 'carKm',
    label: 'Quanti km fai in auto in un anno?',
    type: 'wheel',
    min: 0,
    max: 50000,
    step: 20,
    defaultValue: 8000,
    unit: 'km/anno',
    group: 'Trasporti'
  },
  {
    key: 'carType',
    label: 'Che auto usi più spesso?',
    type: 'select',
    defaultValue: 'petrol',
    group: 'Trasporti',
    options: [
      ['none', 'Non uso auto privata'],
      ['petrol', 'Benzina'],
      ['diesel', 'Diesel'],
      ['hybrid', 'Ibrida'],
      ['ev', 'Elettrica']
    ]
  },
  {
    key: 'publicKmWeek',
    label: 'Quanti km fai con mezzi pubblici in una settimana tipica?',
    type: 'wheel',
    min: 0,
    max: 500,
    step: 5,
    defaultValue: 30,
    unit: 'km/settimana',
    group: 'Trasporti'
  },
  {
    key: 'shortFlights',
    label: 'Voli brevi europei andata/ritorno in un anno',
    type: 'number',
    min: 0,
    max: 20,
    step: 1,
    placeholder: 'es. 2',
    defaultValue: 1,
    group: 'Trasporti'
  },
  {
    key: 'longFlights',
    label: 'Voli lunghi intercontinentali andata/ritorno in un anno',
    type: 'number',
    min: 0,
    max: 12,
    step: 1,
    placeholder: 'es. 0',
    defaultValue: 0,
    group: 'Trasporti'
  },
  {
    key: 'homeSize',
    label: 'Quanto è grande la casa in m²?',
    type: 'number',
    min: 20,
    max: 400,
    step: 5,
    placeholder: 'es. 85',
    defaultValue: 80,
    group: 'Casa'
  },
  {
    key: 'householdPeople',
    label: 'Quante persone vivono in casa?',
    type: 'number',
    min: 1,
    max: 8,
    step: 1,
    placeholder: 'es. 2',
    defaultValue: 2,
    group: 'Casa'
  },
  {
    key: 'heatingType',
    label: 'Come vi riscaldate principalmente?',
    type: 'select',
    defaultValue: 'gas',
    group: 'Casa',
    options: [
      ['gas', 'Gas metano'],
      ['oil', 'Gasolio / GPL'],
      ['heatpump', 'Pompa di calore'],
      ['district', 'Teleriscaldamento'],
      ['biomass', 'Biomassa / pellet'],
      ['unknown', 'Non lo so']
    ]
  },
  {
    key: 'greenPower',
    label: 'Quanta elettricità proviene da fonti rinnovabili?',
    type: 'range',
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 25,
    unit: '%',
    group: 'Casa'
  },
  {
    key: 'meatMeals',
    label: 'Quanti pasti con carne mangi in una settimana?',
    type: 'number',
    min: 0,
    max: 21,
    step: 1,
    placeholder: 'es. 6',
    defaultValue: 5,
    group: 'Dieta'
  },
  {
    key: 'dairyLevel',
    label: 'Quanto consumi latticini?',
    type: 'select',
    defaultValue: 'medium',
    group: 'Dieta',
    options: [
      ['low', 'Poco o quasi mai'],
      ['medium', 'Qualche volta a settimana'],
      ['high', 'Quasi ogni giorno']
    ]
  },
  {
    key: 'shoppingLevel',
    label: 'Quanto compri vestiti, elettronica e oggetti nuovi?',
    type: 'select',
    defaultValue: 'medium',
    group: 'Consumi',
    options: [
      ['low', 'Poco, riparo e tengo a lungo'],
      ['medium', 'Nella media'],
      ['high', 'Spesso, anche per piacere / upgrade'],
      ['very-high', 'Molto spesso, ritmo alto']
    ]
  }
]

const questionGroups = ['Trasporti', 'Casa', 'Dieta', 'Consumi']

const sampleValues = {
  country: 'it',
  carKm: 14000,
  carType: 'petrol',
  publicKmWeek: 20,
  shortFlights: 3,
  longFlights: 1,
  homeSize: 95,
  householdPeople: 2,
  heatingType: 'gas',
  greenPower: 25,
  meatMeals: 8,
  dairyLevel: 'high',
  shoppingLevel: 'high'
}

const factors = {
  carKgPerKm: {
    none: 0,
    petrol: 0.192,
    diesel: 0.171,
    hybrid: 0.11,
    ev: 0.06
  },
  publicKgPerKm: 0.05,
  shortFlightTons: 0.5,
  longFlightTons: 1.8,
  heatingTonsPerSqm: {
    gas: 0.038,
    oil: 0.052,
    heatpump: 0.012,
    district: 0.021,
    biomass: 0.01
  },
  dairyTons: {
    low: 0.1,
    medium: 0.28,
    high: 0.48
  },
  shoppingTons: {
    low: 0.45,
    medium: 1.05,
    high: 1.85,
    'very-high': 2.7
  }
}

const bandConfig = [
  { max: 2.5, label: 'Ottimo', classes: 'bg-emerald-100 text-emerald-800' },
  { max: 5, label: 'Buono', classes: 'bg-lime-100 text-lime-800' },
  { max: 8, label: 'Medio', classes: 'bg-amber-100 text-amber-800' },
  { max: Infinity, label: 'Alto', classes: 'bg-rose-100 text-rose-800' }
]

const form = document.querySelector('#calculator-form')
const resultsSection = document.querySelector('#results')
const calculateBtn = document.querySelector('#calculate-btn')
const sampleBtn = document.querySelector('#sample-btn')
const totalOutput = document.querySelector('#total-output')
const bandOutput = document.querySelector('#band-output')
const summaryOutput = document.querySelector('#summary-output')
const targetOutput = document.querySelector('#target-output')
const planetOutput = document.querySelector('#planet-output')
const bars = document.querySelector('#bars')
const tips = document.querySelector('#tips')
const weeklyChallenge = document.querySelector('#weekly-challenge')
const planetCard = document.querySelector('#planet-card')
const planetScore = document.querySelector('#planet-score')
const whatIfCar = document.querySelector('#whatif-car')
const whatIfGreen = document.querySelector('#whatif-green')
const whatIfFlight = document.querySelector('#whatif-flight')
const whatIfMeat = document.querySelector('#whatif-meat')
const whatIfCarValue = document.querySelector('#whatif-car-value')
const whatIfGreenValue = document.querySelector('#whatif-green-value')
const whatIfFlightValue = document.querySelector('#whatif-flight-value')
const whatIfMeatValue = document.querySelector('#whatif-meat-value')
const whatIfOutput = document.querySelector('#whatif-output')
const whatIfDelta = document.querySelector('#whatif-delta')
const calculatorModal = document.querySelector('#calculator-modal')
const calculatorPanel = document.querySelector('#calculator-panel')
const openCalculatorButtons = document.querySelectorAll('[data-open-calculator]')
const closeCalculatorBtn = document.querySelector('#close-calculator')
const heroMetrics = document.querySelector('#hero-metrics')
const intensityTable = document.querySelector('#intensity-table')
const progressValue = document.querySelector('#progress-value')
const progressBar = document.querySelector('#progress-bar')

let latestResult = null
let lastFocusedElement = null

renderForm()
renderGridIntensityTable()
setupReveal()
setupModal()
setupWheelInputs()
updatePlanetMood(null)
updateHeroMetrics()
updateProgress()

calculateBtn.addEventListener('click', () => {
  const values = getValues()
  const result = computeFootprint(values)
  latestResult = result
  renderResults(result)
})

sampleBtn.addEventListener('click', () => {
  fillSample(sampleValues)
  syncWheelDisplays()
  updateRangeDisplays()
  const result = computeFootprint(getValues())
  latestResult = result
  renderResults(result)
})

whatIfCar?.addEventListener('input', updateWhatIf)
whatIfGreen?.addEventListener('input', updateWhatIf)
whatIfFlight?.addEventListener('change', updateWhatIf)
whatIfMeat?.addEventListener('change', updateWhatIf)

function renderForm() {
  const markup = questionGroups
    .map((group) => {
      const groupQuestions = questions.filter((question) => question.group === group)
      return `
        <section class="rounded-[1.75rem] border border-pine/8 bg-[#fcfdfc] p-5 shadow-sm">
          <div class="mb-4 flex items-center justify-between gap-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-moss">${group}</p>
              <p class="mt-1 text-sm text-ink/56">${groupDescription(group)}</p>
            </div>
          </div>
          <div class="grid gap-4 lg:grid-cols-2">
            ${groupQuestions.map((question) => renderQuestion(question)).join('')}
          </div>
        </section>
      `
    })
    .join('')

  form.innerHTML = markup

  const countrySelect = document.querySelector('#country')
  const heatingSelect = document.querySelector('#heatingType')
  countrySelect?.addEventListener('change', () => {
    applyCountryDefaults(false)
    updateHeroMetrics()
  })
  heatingSelect?.addEventListener('change', updateHeroMetrics)

  form.querySelectorAll('input, select').forEach((element) => {
    element.addEventListener('input', updateProgress)
    element.addEventListener('change', updateProgress)
  })
}

function renderQuestion(question) {
  return `
    <label class="question-card block rounded-[1.45rem] border border-pine/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-moss/20">
      <span class="label-title">${question.label}</span>
      ${renderField(question)}
    </label>
  `
}

function renderField(question) {
  if (question.type === 'select') {
    return `<select id="${question.key}" name="${question.key}" aria-label="${question.label}">
      ${question.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join('')}
    </select>`
  }

  if (question.type === 'range') {
    return `
      <div class="range-field">
        <div class="flex items-center justify-between text-sm text-ink/58">
          <span>Quota dichiarata</span>
          <span id="${question.key}-value" class="font-semibold text-pine">${question.defaultValue}%</span>
        </div>
        <input id="${question.key}" name="${question.key}" type="range" min="${question.min}" max="${question.max}" step="${question.step}" value="${question.defaultValue}" class="mt-3 w-full accent-moss" />
      </div>
    `
  }

  if (question.type === 'wheel') {
    return `
      <div class="wheel-field" data-wheel-root>
        <div class="wheel-controls wheel-controls-rich">
          <button type="button" class="wheel-button" data-wheel-decrement aria-label="Riduci ${question.label}">−</button>
          <div class="wheel-display-wrap">
            <input
              id="${question.key}"
              name="${question.key}"
              type="number"
              min="${question.min}"
              max="${question.max}"
              step="${question.step}"
              value="${question.defaultValue}"
              class="sr-only"
            />
            <div class="wheel-lens" aria-hidden="true"></div>
            <div
              class="wheel-display"
              data-wheel-display
              tabindex="0"
              role="spinbutton"
              aria-label="${question.label}"
              aria-valuemin="${question.min}"
              aria-valuemax="${question.max}"
              aria-valuenow="${question.defaultValue}"
              aria-valuetext="${question.defaultValue} ${question.unit}"
            >${formatInteger(question.defaultValue)} ${question.unit}</div>
          </div>
          <button type="button" class="wheel-button" data-wheel-increment aria-label="Aumenta ${question.label}">+</button>
        </div>
        <div class="wheel-scale" aria-hidden="true">
          <span>−${question.step}</span>
          <span>${question.unit} · scorri o usa ↑↓</span>
          <span>+${question.step}</span>
        </div>
      </div>
    `
  }

  return `<input id="${question.key}" name="${question.key}" type="number" min="${question.min}" max="${question.max}" step="${question.step}" placeholder="${question.placeholder}" value="${question.defaultValue}" />`
}

function groupDescription(group) {
  return {
    Trasporti: 'Auto, mezzi e voli che pesano di più sul totale.',
    Casa: 'Spazio, persone, rete elettrica e riscaldamento.',
    Dieta: 'Abitudini alimentari ad alto impatto annuale.',
    Consumi: 'Shopping, upgrade e acquisti meno intuitivi.'
  }[group]
}

function setupModal() {
  openCalculatorButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      openCalculatorModal(button)
    })
  })

  closeCalculatorBtn?.addEventListener('click', closeCalculatorModal)
  calculatorModal?.addEventListener('click', (event) => {
    if (event.target === calculatorModal) closeCalculatorModal()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !calculatorModal.classList.contains('hidden')) {
      closeCalculatorModal()
      return
    }

    if (event.key === 'Tab' && !calculatorModal.classList.contains('hidden')) {
      trapFocus(event)
    }
  })
}

function openCalculatorModal(trigger) {
  lastFocusedElement = trigger
  calculatorModal.classList.remove('hidden')
  calculatorModal.setAttribute('aria-hidden', 'false')
  requestAnimationFrame(() => calculatorModal.classList.add('is-open'))
  document.body.classList.add('modal-open')
  const firstFocusable = getFocusableElements()[0]
  firstFocusable?.focus()
}

function closeCalculatorModal() {
  calculatorModal.classList.remove('is-open')
  calculatorModal.classList.add('hidden')
  calculatorModal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  lastFocusedElement?.focus()
}

function getFocusableElements() {
  return [...calculatorPanel.querySelectorAll('button, [href], input, select, [tabindex]:not([tabindex="-1"])')].filter((el) => !el.hasAttribute('disabled'))
}

function trapFocus(event) {
  const focusable = getFocusableElements()
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function setupWheelInputs() {
  const wheelFields = document.querySelectorAll('[data-wheel-root]')
  wheelFields.forEach((root) => {
    const input = root.querySelector('input')
    const display = root.querySelector('[data-wheel-display]')
    const question = questions.find((item) => item.key === input.id)
    const step = Number(input.step || question?.step || 1)
    let wheelDeltaBuffer = 0

    root.querySelector('[data-wheel-decrement]')?.addEventListener('click', () => adjustWheel(input, display, -step, question))
    root.querySelector('[data-wheel-increment]')?.addEventListener('click', () => adjustWheel(input, display, step, question))

    display.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault()
        adjustWheel(input, display, step, question)
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault()
        adjustWheel(input, display, -step, question)
      }
      if (event.key === 'PageUp') {
        event.preventDefault()
        adjustWheel(input, display, step * 5, question)
      }
      if (event.key === 'PageDown') {
        event.preventDefault()
        adjustWheel(input, display, -step * 5, question)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setWheelValue(input, display, Number(input.min), question)
      }
      if (event.key === 'End') {
        event.preventDefault()
        setWheelValue(input, display, Number(input.max), question)
      }
    })

    display.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault()
        wheelDeltaBuffer += event.deltaY
        if (Math.abs(wheelDeltaBuffer) < 16) return
        const direction = wheelDeltaBuffer > 0 ? -1 : 1
        wheelDeltaBuffer = 0
        adjustWheel(input, display, direction * step, question)
      },
      { passive: false }
    )
  })

  document.querySelector('#greenPower')?.addEventListener('input', updateRangeDisplays)

  syncWheelDisplays()
  updateRangeDisplays()
  applyCountryDefaults(true)
}

function syncWheelDisplays() {
  document.querySelectorAll('[data-wheel-root]').forEach((root) => {
    const input = root.querySelector('input')
    const display = root.querySelector('[data-wheel-display]')
    const question = questions.find((item) => item.key === input.id)
    setWheelValue(input, display, Number(input.value), question, false)
  })
}

function updateRangeDisplays() {
  const greenPower = document.querySelector('#greenPower')
  const greenValue = document.querySelector('#greenPower-value')
  if (greenPower && greenValue) greenValue.textContent = `${greenPower.value}%`
}

function adjustWheel(input, display, delta, question) {
  setWheelValue(input, display, Number(input.value) + delta, question)
}

function setWheelValue(input, display, nextValue, question, dispatch = true) {
  const min = Number(input.min)
  const max = Number(input.max)
  const step = Number(input.step || 1)
  const clamped = Math.min(max, Math.max(min, Math.round(nextValue / step) * step))
  input.value = clamped
  display.textContent = `${formatInteger(clamped)} ${question.unit}`
  display.setAttribute('aria-valuenow', String(clamped))
  display.setAttribute('aria-valuetext', `${formatInteger(clamped)} ${question.unit}`)
  display.classList.remove('wheel-bump')
  void display.offsetWidth
  display.classList.add('wheel-bump')
  if (dispatch) input.dispatchEvent(new Event('input', { bubbles: true }))
}

function applyCountryDefaults(initial = false) {
  const countrySelect = document.querySelector('#country')
  const heatingSelect = document.querySelector('#heatingType')
  if (!countrySelect || !heatingSelect) return

  const profile = COUNTRY_GRID_FACTORS[countrySelect.value] || COUNTRY_GRID_FACTORS.eu
  if (initial || heatingSelect.value === 'unknown') {
    heatingSelect.dataset.fallback = profile.heatingFallback
  }
}

function getValues() {
  return questions.reduce((acc, question) => {
    const element = document.querySelector(`#${question.key}`)
    if (!element) return acc
    acc[question.key] = ['number', 'wheel', 'range'].includes(question.type) ? Number(element.value || 0) : element.value
    return acc
  }, {})
}

function fillSample(values) {
  Object.entries(values).forEach(([key, value]) => {
    const element = document.querySelector(`#${key}`)
    if (element) element.value = value
  })
  updateHeroMetrics()
  updateRangeDisplays()
  updateProgress()
}

function computeFootprint(values) {
  const country = COUNTRY_GRID_FACTORS[values.country] || COUNTRY_GRID_FACTORS.eu
  const car = (values.carKm * factors.carKgPerKm[values.carType]) / 1000
  const flights = values.shortFlights * factors.shortFlightTons + values.longFlights * factors.longFlightTons
  const publicTransit = ((values.publicKmWeek || 0) * 52 * factors.publicKgPerKm) / 1000

  const householdPeople = Math.max(values.householdPeople || 1, 1)
  const homeSize = Math.max(values.homeSize || 20, 20)

  const heatingType = values.heatingType === 'unknown' ? country.heatingFallback : values.heatingType
  const heating = (homeSize * factors.heatingTonsPerSqm[heatingType]) / householdPeople

  const baseElectricityKwh = 900 + homeSize * 18
  const renewableShare = clamp(Number(values.greenPower) / 100, 0, 1)
  const adjustedGridKgPerKwh = Math.max(country.electricityKgPerKwh * (1 - renewableShare * 0.85), 0.015)
  const electricity = ((baseElectricityKwh / householdPeople) * adjustedGridKgPerKwh) / 1000

  const meat = 0.75 + Math.min(values.meatMeals, 21) * 0.095
  const dairy = factors.dairyTons[values.dairyLevel]
  const diet = meat + dairy

  const shopping = factors.shoppingTons[values.shoppingLevel]

  const categories = {
    Trasporti: round(car + flights + publicTransit),
    Casa: round(heating + electricity),
    Dieta: round(diet),
    Consumi: round(shopping)
  }

  const total = round(Object.values(categories).reduce((sum, value) => sum + value, 0))
  const planets = round(total / 2.5)
  const targetGap = round(total - 2.5)
  const band = bandConfig.find((entry) => total <= entry.max)
  const ordered = Object.entries(categories).sort((a, b) => b[1] - a[1])

  const tipsList = buildTips(values, ordered, country, heatingType)
  const comparisons = {
    italyDelta: round(total - 6.2),
    euDelta: round(total - 7.8),
    worldDelta: round(total - 6.6)
  }

  const confidenceNote =
    values.heatingType === 'unknown'
      ? `Hai scelto “Non lo so” sul riscaldamento. Uso un default medio per ${country.label.toLowerCase()}, quindi questa parte è meno precisa.`
      : `Uso un fattore elettrico indicativo per ${country.label.toLowerCase()} (${country.electricityKgPerKwh.toFixed(3)} kg CO₂e/kWh), corretto in base alla quota rinnovabile continua dichiarata.`

  return {
    total,
    planets,
    targetGap,
    band,
    categories,
    ordered,
    tips: tipsList,
    challenge: buildChallenge(values, ordered),
    values,
    comparisons,
    country,
    adjustedGridKgPerKwh,
    confidenceNote
  }
}

function renderResults(result) {
  resultsSection.classList.remove('hidden')
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })

  totalOutput.textContent = `${format(result.total)} t`
  bandOutput.textContent = result.band.label
  bandOutput.className = `rounded-full px-4 py-2 text-sm font-semibold ${result.band.classes}`
  targetOutput.textContent =
    result.targetGap <= 0
      ? `${format(Math.abs(result.targetGap))} t sotto il target`
      : `${format(result.targetGap)} t sopra il target`
  planetOutput.textContent = `${format(result.planets)} Pianeti`
  summaryOutput.innerHTML = `${buildSummary(result)} <span class="mt-3 block text-sm text-ink/58">${result.confidenceNote}</span>`

  renderBars(result.categories, result.total)
  renderTips(result.tips)
  renderChallenge(result.challenge)
  updatePlanetMood(result.total)

  resetWhatIfControls()
  updateWhatIf()
}

function renderBars(categories, total) {
  bars.innerHTML = Object.entries(categories)
    .map(([label, value]) => {
      const width = total > 0 ? Math.max((value / total) * 100, 4) : 0
      return `
        <div>
          <div class="mb-2 flex items-center justify-between text-sm">
            <span class="font-medium text-ink/80">${label}</span>
            <span class="text-ink/58">${format(value)} t</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${width}%"></div>
          </div>
        </div>
      `
    })
    .join('')
}

function renderTips(items) {
  tips.innerHTML = items
    .map(
      (tip) => `
        <article class="rounded-[1.35rem] border border-pine/10 bg-white p-4">
          <p class="font-semibold text-pine">${tip.title}</p>
          <p class="mt-2 text-sm leading-7 text-ink/68">${tip.body}</p>
        </article>
      `
    )
    .join('')
}

function renderChallenge(challenge) {
  weeklyChallenge.innerHTML = `
    <article class="rounded-[1.35rem] bg-[#f6faf7] p-4">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.18em] text-moss">7 giorni</p>
          <p class="mt-2 font-semibold text-pine">${challenge.title}</p>
        </div>
        <span class="rounded-full bg-moss/10 px-3 py-1 text-xs font-semibold text-moss">-${challenge.impact}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-ink/68">${challenge.body}</p>
      <p class="mt-3 text-sm font-medium text-ink/72">Checkpoint: ${challenge.checkpoint}</p>
    </article>
  `
}

function renderGridIntensityTable() {
  intensityTable.innerHTML = ['it', 'fr', 'de', 'es', 'uk', 'us', 'eu', 'world']
    .map((key) => COUNTRY_GRID_FACTORS[key])
    .map(
      (item) => `
      <tr>
        <td class="py-3 pr-4 font-medium text-pine">${item.label}</td>
        <td class="py-3 pr-4 text-ink/68">${item.electricityKgPerKwh.toFixed(3)} kg CO₂e/kWh</td>
        <td class="py-3 text-ink/58">${item.heatingNote}</td>
      </tr>
    `
    )
    .join('')
}

function buildTips(values, ordered, country, heatingType) {
  const tips = []
  const [largest] = ordered

  if (largest?.[0] === 'Trasporti') {
    tips.push({
      title: 'Taglia i km fossili prima del resto',
      body:
        values.longFlights > 0
          ? 'Nel tuo profilo i voli lunghi andata/ritorno spingono molto il totale. Se riesci a sostituirne anche solo uno o a volare meno spesso, il taglio è immediato.'
          : 'Nel tuo profilo l’auto pesa parecchio. Ridurre km, condividere tratte o passare a un mezzo più efficiente può abbassare la stima in modo visibile.'
    })
  }

  if (ordered.some(([label]) => label === 'Casa')) {
    tips.push({
      title: 'Casa: lavora sul mix, non sulle briciole',
      body:
        heatingType === 'gas' || heatingType === 'oil'
          ? `Nel tuo paese (${country.label}) il riscaldamento fossile resta una leva forte. Isolamento, regolazione migliore o una pompa di calore spostano più delle piccole rinunce quotidiane.`
          : 'Hai già una base discreta sul riscaldamento. Il prossimo salto utile è aumentare la quota rinnovabile e contenere i consumi della casa per persona.'
    })
  }

  if (values.meatMeals >= 7 || values.dairyLevel === 'high') {
    tips.push({
      title: 'Dieta: meno frequenza, non per forza perfezione',
      body: 'Ridurre di 2-3 pasti di carne a settimana e alleggerire i latticini è spesso più efficace di tante micro-ottimizzazioni sparse.'
    })
  } else if (values.shoppingLevel === 'high' || values.shoppingLevel === 'very-high') {
    tips.push({
      title: 'Consumi: comprare meno volte vale parecchio',
      body: 'Se allunghi il ciclo di vita di vestiti, device e upgrade, la parte “invisibile” della footprint scende senza toccare il comfort quotidiano.'
    })
  }

  return tips.slice(0, 3)
}

function buildChallenge(values, ordered) {
  const [largest] = ordered

  if (largest?.[0] === 'Trasporti') {
    return {
      title: 'Settimana anti-spostamenti automatici',
      body:
        values.longFlights > 0
          ? 'Per 7 giorni blocca ogni prenotazione aerea non necessaria e prepara un’alternativa concreta per il prossimo volo evitabile. Il punto non è essere puro, è spezzare l’automatismo.'
          : 'Per 7 giorni taglia almeno il 20% dei km in auto: due tragitti a piedi, una tratta condivisa, una commissione accorpata. Devi sentirlo sul calendario, non solo nella coscienza.',
      checkpoint: 'Conta i km evitati o i tragitti convertiti entro domenica sera.',
      impact: '0,2–0,6 t/anno'
    }
  }

  if (largest?.[0] === 'Casa') {
    return {
      title: 'Settimana casa più sobria',
      body: 'Per 7 giorni abbassa il riscaldamento di un grado equivalente, controlla gli standby e fai una piccola audit domestica stanza per stanza. Serve a capire quanta dispersione stai normalizzando.',
      checkpoint: 'Segna tre sprechi evitati e una modifica che puoi tenere fissa.',
      impact: '0,1–0,4 t/anno'
    }
  }

  if (largest?.[0] === 'Dieta') {
    return {
      title: 'Settimana plant-forward senza fanatismi',
      body: 'Per 7 giorni togli tre pasti di carne e alleggerisci i latticini più facili da sostituire. Non devi convertire la tua identità, solo testare il rapporto tra abitudine e impatto.',
      checkpoint: 'Annota i pasti davvero sostituiti, non quelli solo immaginati.',
      impact: '0,1–0,3 t/anno'
    }
  }

  return {
    title: 'Settimana zero upgrade impulsivi',
    body: 'Per 7 giorni non comprare nulla di nuovo che non sia strettamente necessario. Se ti viene voglia di un upgrade, mettilo in lista e lascialo fermentare: spesso passa da solo.',
    checkpoint: 'Conta quante spese hai rimandato e quante erano davvero evitabili.',
    impact: '0,1–0,5 t/anno'
  }
}

function buildSummary(result) {
  const vsItaly = compareCopy(result.comparisons.italyDelta, 'media italiana')
  const vsWorld = compareCopy(result.comparisons.worldDelta, 'media globale')
  return `Sei in fascia ${result.band.label.toLowerCase()}. La tua stima è ${vsItaly} e ${vsWorld}. Le aree che pesano di più sono ${result.ordered
    .slice(0, 2)
    .map(([label]) => label.toLowerCase())
    .join(' e ')}.`
}

function compareCopy(delta, reference) {
  if (Math.abs(delta) < 0.3) return `in linea con la ${reference}`
  return delta > 0 ? `${format(delta)} t sopra la ${reference}` : `${format(Math.abs(delta))} t sotto la ${reference}`
}

function updatePlanetMood(total) {
  let score = 'Da calcolare'
  let gradient = 'radial-gradient(circle at 30% 30%, #edf0ee 0%, #c8d1cc 35%, #8a968f 72%, #69736e 100%)'
  let glow = '0 28px 70px rgba(125, 134, 129, 0.18)'

  if (typeof total === 'number') {
    if (total > 8) {
      score = 'Sotto pressione'
      gradient = 'radial-gradient(circle at 30% 30%, #f6d4a6 0%, #f2a24c 28%, #9b4a26 65%, #5b2415 100%)'
      glow = '0 30px 80px rgba(173,88,37,0.28)'
    } else if (total > 5) {
      score = 'Da alleggerire'
      gradient = 'radial-gradient(circle at 30% 30%, #dbf1b4 0%, #9ccf63 28%, #517b2c 65%, #25411a 100%)'
      glow = '0 30px 80px rgba(108,136,54,0.26)'
    } else {
      score = 'Bilanciato'
      gradient = 'radial-gradient(circle at 30% 30%, #c7f8d9 0%, #59b87c 28%, #1f5f46 65%, #123f31 100%)'
      glow = '0 30px 80px rgba(22,77,56,0.28)'
    }
  }

  planetScore.textContent = score
  planetCard.style.background = gradient
  planetCard.style.boxShadow = `inset -24px -24px 80px rgba(0,0,0,0.18), ${glow}`
}

function updateHeroMetrics() {
  const values = getValues()
  const country = COUNTRY_GRID_FACTORS[values.country || 'it'] || COUNTRY_GRID_FACTORS.eu
  const heatingType = values.heatingType === 'unknown' ? country.heatingFallback : values.heatingType

  heroMetrics.innerHTML = `
    <div class="rounded-3xl border border-white/70 bg-white/78 p-5 shadow-card">
      <dt class="text-[13px] leading-5 text-[#5f6f68]">Rete elettrica</dt>
      <dd class="mt-2 text-2xl font-bold text-pine">${country.electricityKgPerKwh.toFixed(3)} kg/kWh</dd>
      <p class="mt-2 text-sm text-ink/65">Default 2024 per ${country.label.toLowerCase()}</p>
    </div>
    <div class="rounded-3xl border border-white/70 bg-white/78 p-5 shadow-card">
      <dt class="text-[13px] leading-5 text-[#5f6f68]">Riscaldamento</dt>
      <dd class="mt-2 text-2xl font-bold text-pine">${heatingLabel(heatingType)}</dd>
      <p class="mt-2 text-sm text-ink/65">${values.heatingType === 'unknown' ? 'Fallback medio attivo' : 'Dato diretto inserito nel form'}</p>
    </div>
    <div class="rounded-3xl border border-white/70 bg-white/78 p-5 shadow-card">
      <dt class="text-[13px] leading-5 text-[#5f6f68]">Metodo</dt>
      <dd class="mt-2 text-2xl font-bold text-pine">Stima chiara</dd>
      <p class="mt-2 text-sm text-ink/65">What-if continuo, leve visibili, assunzioni dichiarate</p>
    </div>
  `
}

function heatingLabel(key) {
  return {
    gas: 'Gas',
    oil: 'Gasolio/GPL',
    heatpump: 'Pompa di calore',
    district: 'Teleriscaldamento',
    biomass: 'Biomassa'
  }[key] || 'Default medio'
}

function resetWhatIfControls() {
  if (whatIfCar) whatIfCar.value = 0
  if (whatIfGreen) whatIfGreen.value = 0
  if (whatIfFlight) whatIfFlight.checked = false
  if (whatIfMeat) whatIfMeat.checked = false
}

function updateWhatIf() {
  if (!latestResult) {
    if (whatIfOutput) whatIfOutput.textContent = 'Calcola prima'
    if (whatIfDelta) whatIfDelta.textContent = 'Serve una stima base per vedere il delta.'
    return
  }

  const carCut = Number(whatIfCar?.value || 0)
  const greenBoost = Number(whatIfGreen?.value || 0)
  const cutFlight = Boolean(whatIfFlight?.checked)
  const cutMeat = Boolean(whatIfMeat?.checked)

  if (whatIfCarValue) whatIfCarValue.textContent = `${carCut}%`
  if (whatIfGreenValue) whatIfGreenValue.textContent = `+${greenBoost}%`
  if (whatIfFlightValue) whatIfFlightValue.textContent = cutFlight ? '−1 volo lungo' : 'nessun taglio'
  if (whatIfMeatValue) whatIfMeatValue.textContent = cutMeat ? '−3 pasti carne' : 'nessun taglio'

  const values = { ...latestResult.values }
  values.carKm = round(values.carKm * (1 - carCut / 100), 0)
  values.greenPower = Math.min(100, Number(values.greenPower) + greenBoost)
  if (cutFlight) values.longFlights = Math.max(0, values.longFlights - 1)
  if (cutMeat) values.meatMeals = Math.max(0, values.meatMeals - 3)

  const simulated = computeFootprint(values)
  const delta = round(latestResult.total - simulated.total)

  whatIfOutput.textContent = `${formatPrecise(simulated.total)} t`
  whatIfDelta.textContent =
    delta > 0 ? `Riduzione stimata: ${formatDelta(delta)}` : 'Nessun cambiamento rispetto alla stima base.'
}

function updateProgress() {
  const values = getValues()
  const completed = questions.filter((question) => {
    const value = values[question.key]
    if (question.type === 'select') return value !== undefined && value !== ''
    return value !== undefined && value !== null && value !== ''
  }).length
  const percent = Math.round((completed / questions.length) * 100)
  if (progressValue) progressValue.textContent = `${completed}/${questions.length}`
  if (progressBar) progressBar.style.width = `${percent}%`
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.18 }
  )

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
}

function round(value, digits = 2) {
  return Number(value.toFixed(digits))
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function format(value) {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value)
}

function formatPrecise(value) {
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

function formatDelta(value) {
  if (value < 0.1) return `${Math.round(value * 1000)} kg CO₂e/anno`
  return `${formatPrecise(value)} t CO₂e/anno`
}

function formatInteger(value) {
  return new Intl.NumberFormat('it-IT', {
    maximumFractionDigits: 0
  }).format(value)
}
