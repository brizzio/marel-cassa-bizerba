
import { useDevice } from './useDevice'

const useIntl = () => {

const device = useDevice()

const locale = device && device.countryIso
?`${device.countryIso.toLowerCase()}-${device.countryIso.toUpperCase()}`
:'it-IT'

const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',

});

  return {
    currency:(val)=>currencyFormatter.format(val)
  }
}

export default useIntl