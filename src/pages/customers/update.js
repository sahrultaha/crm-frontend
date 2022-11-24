import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import * as React from 'react'
import AddressInputs from '@/components/forms/AddressInputs'
import IcCheckingInputs from '@/components/forms/IcCheckingInputs'

import AppLayout from '@/components/Layouts/AppLayout'
import MainBody from '@/components/MainBody'
import Head from 'next/head'

const Update = () => {
    const router = useRouter()
    const [data, setData] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const [CountryCode, setCountryCode] = useState('')

    const [existingCustomer, setExistingCustomer] = useState(null)

    const [IcNumber, setIcNumber] = useState('')
    const [IcTypeId, setIcTypeId] = useState('')
    const [IcColorId, setIcColorId] = useState('')
    const [IcExpiryDate, setIcExpiryDate] = useState('')
    const [updateModeValue, setUpdateModeValue] = useState(false)


    const [OriIcColorId, setOriIcColorId] = useState('')
    const [OriIcExpiryDate, setOriIcExpiryDate] = useState('')
    const [IcNumberOrig, setIcNumberOrig] = useState('')
    const [IcTypeIdOrig, setIcTypeIdOrig] = useState('')


    const [countryId, setCountryId] = useState(1)

    const [countries, setCountriesList] = useState([])

    const [customerTitleId, setCustomerTitleId] = useState('')
    const [accountCategoryId, setAccountCategoryId] = useState(1)
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState(null)

    const [district, setDistrict] = useState('-----')
    const [mukim, setMukim] = useState('-----')
    const [village, setVillage] = useState({id : '', 'name' : ''})
    const [postalCode, setPostalCode] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [simpang, setSimpang] = useState('')
    const [street, setStreet] = useState('')
    const [buildingName, setBuildingName] = useState('')
    const [block, setBlock] = useState('')
    const [floor, setFloor] = useState('')
    const [unit, setUnit] = useState('')
    const [district_id, setDistrictId] = useState('')
    const [mukim_id, setMukimId] = useState('')
    const [village_id, setVillageId] = useState('')
    const [postal_code_id, setPostalCodeId] = useState('')
    const [address_id, setAddressID] = useState('')

    const [icFront, setIcFront] = useState('')
    const [icBack, setIcBack] = useState('')
    const [errors, setErrors] = useState([])
    const [icUrls, setIcUrls] = useState([])

    const [icFrontID, seticFrontID] = useState('')
    const [icBackID, seticBackID] = useState('')

    const onExistingCustomerHandler = val => {
        console.log(IcNumber, IcNumberOrig)
        console.log(IcTypeId, IcTypeIdOrig)
        setUpdateModeValue(true)
        setExistingCustomer(val)
    }

    const onNameChangeHandler = event => setName(event.target.value)
    const onEmailChangeHandler = event => setEmail(event.target.value.trim())
    const onMobileNumberChangeHandler = event =>
        setMobileNumber(event.target.value.trim())

    const onCountryCodeChangeHandler = event => setCountryCode(event.target.value)

    const onCountryIdChangeHandler = event => setCountryId(event.target.value)
    const onCustomerTitleIdChangeHandler = event =>
        setCustomerTitleId(event.target.value)
    const onAccountCategoryIdChangeHandler = event =>
        setAccountCategoryId(event.target.value)
    const onBirthDateChangeHandler = event =>
        setBirthDate(event.target.value.trim())
    const onAddressChangeHandler = val => {
        setAddress(val)
    }

    const onIcFrontChangeHandler = event => setIcFront(event.target.files[0])
    const onIcBackChangeHandler = event => setIcBack(event.target.files[0])

    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        // console.log("customer id : " + CustomerId)

        axios.get(`/api/country`)
            .then(res => {
                // console.log(res.data)
                setCountriesList(res.data)
            })
            .catch(error => {
                // setData(null)
            })
            .finally(() => {

            })
    }, [router.isReady])

    useEffect(() => {
        if (!router.isReady) return
        const { id: CustomerId } = router.query
        // console.log("customer id : " + CustomerId)

        axios(`/api/customers/get?id=${CustomerId}`)
            .then(res => {
                // console.log("test",res.data)

                setData(res.data)

                setName(res.data['name'])
                setEmail(res.data['email'] ?? "")
                setMobileNumber(res.data['mobile_number'] ?? "")
                setCountryCode(res.data['country_code'] ?? "")

                setIcNumber(res.data['ic_number'])
                setIcTypeId(res.data['ic_type_id'])
                setIcColorId(res.data['ic_color_id'] ?? "")
                setIcExpiryDate(res.data['ic_expiry_date'])


                setOriIcColorId(res.data['ic_color_id'] ?? "")
                setOriIcExpiryDate(res.data['ic_expiry_date'])

                setIcNumberOrig(res.data['ic_number'])
                setIcTypeIdOrig(res.data['ic_type_id'])



                setCountryId(res.data['country_id'])
                setCustomerTitleId(res.data['customer_title_id'] ?? "")
                setAccountCategoryId(res.data['account_category_id'])
                setBirthDate(res.data['birth_date'])
                setAddressID(res.data['address'][0]['address_id'] ?? '')
                setHouseNumber(res.data['address'][0]['address']['house_number'] ?? '')
                setSimpang(res.data['address'][0]['address']['simpang'] ?? '')
                setStreet(res.data['address'][0]['address']['street'] ?? '')
                setBuildingName(res.data['address'][0]['address']['building_name'] ?? '')
                setBlock(res.data['address'][0]['address']['block'] ?? '')
                setFloor(res.data['address'][0]['address']['floor'] ?? '')
                setUnit(res.data['address'][0]['address']['unit'] ?? '')
                
                setMukim(res.data['address'][0]['address']['mukim']['name'] ?? '')
                setDistrict(res.data['address'][0]['address']['district']['name'] ?? '')
                setPostalCode(res.data['address'][0]['address']['postalcode']['name'] ?? '')
                
                
                setMukimId(res.data['address'][0]['address']['mukim']['id'] ?? '');
                setDistrictId(res.data['address'][0]['address']['district']['id'] ?? '');
                setPostalCodeId(res.data['address'][0]['address']['postalcode']['id'] ?? '');
                
                setVillageId(res.data['address'][0]['address']['village']['id'] ?? '');
                setVillage({
                    'id' : res.data['address'][0]['address']['village']['id'] ?? '',
                    'name' : res.data['address'][0]['address']['village']['name'] ?? ''
                })

            })
            .catch(error => {
                // setData(null)
            })
            .finally(() => {

            })
    }, [router.isReady])

    useEffect(async () => {
        if (!data) {
            console.log('no data, abort fetching images...')
            return
        }

        try {
            seticFrontID(data.file_ids[0])
            seticBackID(data.file_ids[1])

            for (const fileId of data.file_ids) {
                const resp = await axios.get(`/api/files/${fileId}`)
                setIcUrls(prevState => [
                    ...prevState,
                    {
                        id: fileId,
                        url: resp.data.url,
                    },
                ])
            }
        } catch (e) {
            console.log('Error getting file urls...', e)
        }
    }, [data])
    
    const updateForm = async event => {
        var confirmBox = confirm('Are you sure to update customer?');
        if(confirmBox){
          
        event.preventDefault()
        const { id: CustomerId } = router.query

        // TODO: validation
        // if (icFront === '' || icFront === null) {
        //     alert('No ic front provided')
        // }

        // if (icBack === '' || icBack === null) {
        //     alert('No ic back provided')
        // }

        const data = {
          
            id: CustomerId,
            name: name,
            email: email === '' ? null : email,
            mobile_number: mobileNumber === '' ? null : mobileNumber,
            country_code: CountryCode == '' ? null: CountryCode,
            country_id: countryId,
            customer_title_id: customerTitleId === '' ? null : customerTitleId,
            account_category_id: accountCategoryId,
            birth_date: birthDate,
            ic_number: IcNumber ?? '',
            ic_type_id: IcTypeId ?? '',
            ic_color_id: IcColorId ?? '',
            ic_expiry_date: IcExpiryDate ?? '',
            village_id: village_id ?? '',
            district_id: district_id ?? '',
            mukim_id: mukim_id ?? '',
            postal_code_id: postal_code_id ?? '',
            house_number: houseNumber ?? '',
            simpang: simpang ?? '',
            street: street ?? '',
            building_name: buildingName ?? '',
            block: block ?? '',
            floor: floor ?? '',
            unit: unit ?? '',
            address_id: address_id,
        }
        console.log(data)
        await axios
            .put('/api/customers/update', data)
            .then(async res => {
                const id = res.data.id

                const headers = {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
                // console.log("ic front id", icFrontID, " back:", icBackID)
                const icFrontFormData = new FormData()
                icFrontFormData.append('file', icFront)
                icFrontFormData.append('relation_id', id)
                icFrontFormData.append('relation_type_id', 1)
                icFrontFormData.append('file_category_id', 1)
                icFrontFormData.append('file_id', icFrontID)
                // patch file using post method
                icFrontFormData.append('_method', 'PATCH')

                const icBackFormData = new FormData()
                icBackFormData.append('file', icBack)
                icBackFormData.append('relation_id', id)
                icBackFormData.append('relation_type_id', 1)
                icBackFormData.append('file_category_id', 1)
                icBackFormData.append('file_id', icBackID)
                // patch file using post method
                icBackFormData.append('_method', 'PATCH')
                try {

                    if (icFront != "") {
                        // console.log(icFrontFormData, "form data front")
                        const responseIcFront = await axios.post(
                            '/api/files',
                            icFrontFormData,
                            headers,
                            // console.log(icFrontFormData + "testing front")
                        )
                        console.log('upload ok')
                        console.log("Front", responseIcFront)
                    }
                    if (icBack != "") {

                        const responseIcBack = await axios.post(
                            '/api/files',
                            icBackFormData,
                            headers,
                            // console.log(icBackFormData + "testing back")
                        )
                        console.log('upload ok')
                        console.log("Back", responseIcBack)
                    }
                    router.push(`/customers/${id}`)

                } catch (e) {
                    console.error('Failed to upload!')
                    console.log(e)
                }

            })
            .catch(error => {
                console.log('error!')
                if (error.response) {
                    // console.log(error.response.status)
                    // console.log(error.response.data)
                    // console.log(error.response.headers)
                    setErrors(error.response.data.errors)
                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error message ', error.message)
                }
                console.log(error.config)
            })
        }
        else{
            event.preventDefault();
            return false;
        }
    }
   

    if (data == null || data == "") {
        return (

            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Update Customer Details
                    </h2>
                }>
                <Head>
                    <title>Update Customer Details</title>
                </Head>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                Invalid Customer ID
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        )
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Update Customer Details
                </h2>
            }>
            <Head>
                <title>Update Customer Details</title>
            </Head>
            <MainBody>
                <form onSubmit={updateForm}>
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={name}
                            className="block mt-1 w-full"
                            onChange={onNameChangeHandler}
                            required
                            pattern="[^\s][a-zA-Z\s]+"
                            autoFocus
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="email">Email (optional)</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                            className="block mt-1 w-full"
                            onChange={onEmailChangeHandler}
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div  className="my-4 grid grid-cols-3 gap-4">
                        <div>
                        <Label htmlFor="mobileNumber">
                            Country Code
                        </Label>

                        <select
                            id="countryCode"
                            value={CountryCode}
                            onChange={onCountryCodeChangeHandler}
                            className="w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                           <option value={673}>Brunei(+673)</option>
                            <option value={213}>Algeria(+213)</option>
                            <option value={376}>Andorra(+376)</option>
                            <option value={244}>Angola(+244)</option>
                            <option value={1264}>Anguilla(+1264)</option>
                            <option value={1268}>Antigua&amp;Barbuda(+1268)</option>
                            <option value={54}>Argentina(+54)</option>
                            <option value={374}>Armenia(+374)</option>
                            <option value={297}>Aruba(+297)</option>
                            <option value={61}>Australia(+61)</option>
                            <option value={43}>Austria(+43)</option>
                            <option value={994}>Azerbaijan(+994)</option>
                            <option value={1242}>Bahamas(+1242)</option>
                            <option value={973}>Bahrain(+973)</option>
                            <option value={880}>Bangladesh(+880)</option>
                            <option value={1246}>Barbados(+1246)</option>
                            <option value={375}>Belarus(+375)</option>
                            <option value={32}>Belgium(+32)</option>
                            <option value={501}>Belize(+501)</option>
                            <option value={229}>Benin(+229)</option>
                            <option value={1441}>Bermuda(+1441)</option>
                            <option value={975}>Bhutan(+975)</option>
                            <option value={591}>Bolivia(+591)</option>
                            <option value={387}>BosniaHerzegovina(+387)</option>
                            <option value={267}>Botswana(+267)</option>
                            <option value={55}>Brazil(+55)</option>
                            <option value={359}>Bulgaria(+359)</option>
                            <option value={226}>BurkinaFaso(+226)</option>
                            <option value={257}>Burundi(+257)</option>
                            <option value={855}>Cambodia(+855)</option>
                            <option value={237}>Cameroon(+237)</option>
                            <option value={1}>Canada(+1)</option>
                            <option value={238}>CapeVerdeIslands(+238)</option>
                            <option value={1345}>CaymanIslands(+1345)</option>
                            <option value={236}>CentralAfricanRepublic(+236)</option>
                            <option value={56}>Chile(+56)</option>
                            <option value={86}>China(+86)</option>
                            <option value={57}>Colombia(+57)</option>
                            <option value={269}>Comoros(+269)</option>
                            <option value={242}>Congo(+242)</option>
                            <option value={682}>CookIslands(+682)</option>
                            <option value={506}>CostaRica(+506)</option>
                            <option value={385}>Croatia(+385)</option>
                            <option value={53}>Cuba(+53)</option>
                            <option value={90392}>CyprusNorth(+90392)</option>
                            <option value={357}>CyprusSouth(+357)</option>
                            <option value={42}>CzechRepublic(+42)</option>
                            <option value={45}>Denmark(+45)</option>
                            <option value={253}>Djibouti(+253)</option>
                            <option value={1809}>Dominica(+1809)</option>
                            <option value={1809}>DominicanRepublic(+1809)</option>
                            <option value={593}>Ecuador(+593)</option>
                            <option value={20}>Egypt(+20)</option>
                            <option value={503}>ElSalvador(+503)</option>
                            <option value={240}>EquatorialGuinea(+240)</option>
                            <option value={291}>Eritrea(+291)</option>
                            <option value={372}>Estonia(+372)</option>
                            <option value={251}>Ethiopia(+251)</option>
                            <option value={500}>FalklandIslands(+500)</option>
                            <option value={298}>FaroeIslands(+298)</option>
                            <option value={679}>Fiji(+679)</option>
                            <option value={358}>Finland(+358)</option>
                            <option value={33}>France(+33)</option>
                            <option value={594}>FrenchGuiana(+594)</option>
                            <option value={689}>FrenchPolynesia(+689)</option>
                            <option value={241}>Gabon(+241)</option>
                            <option value={220}>Gambia(+220)</option>
                            <option value={7880}>Georgia(+7880)</option>
                            <option value={49}>Germany(+49)</option>
                            <option value={233}>Ghana(+233)</option>
                            <option value={350}>Gibraltar(+350)</option>
                            <option value={30}>Greece(+30)</option>
                            <option value={299}>Greenland(+299)</option>
                            <option value={1473}>Grenada(+1473)</option>
                            <option value={590}>Guadeloupe(+590)</option>
                            <option value={671}>Guam(+671)</option>
                            <option value={502}>Guatemala(+502)</option>
                            <option value={224}>Guinea(+224)</option>
                            <option value={245}>Guinea-Bissau(+245)</option>
                            <option value={592}>Guyana(+592)</option>
                            <option value={509}>Haiti(+509)</option>
                            <option value={504}>Honduras(+504)</option>
                            <option value={852}>HongKong(+852)</option>
                            <option value={36}>Hungary(+36)</option>
                            <option value={354}>Iceland(+354)</option>
                            <option value={91}>India(+91)</option>
                            <option value={62}>Indonesia(+62)</option>
                            <option value={98}>Iran(+98)</option>
                            <option value={964}>Iraq(+964)</option>
                            <option value={353}>Ireland(+353)</option>
                            <option value={972}>Israel(+972)</option>
                            <option value={39}>Italy(+39)</option>
                            <option value={1876}>Jamaica(+1876)</option>
                            <option value={81}>Japan(+81)</option>
                            <option value={962}>Jordan(+962)</option>
                            <option value={7}>Kazakhstan(+7)</option>
                            <option value={254}>Kenya(+254)</option>
                            <option value={686}>Kiribati(+686)</option>
                            <option value={850}>KoreaNorth(+850)</option>
                            <option value={82}>KoreaSouth(+82)</option>
                            <option value={965}>Kuwait(+965)</option>
                            <option value={996}>Kyrgyzstan(+996)</option>
                            <option value={856}>Laos(+856)</option>
                            <option value={371}>Latvia(+371)</option>
                            <option value={961}>Lebanon(+961)</option>
                            <option value={266}>Lesotho(+266)</option>
                            <option value={231}>Liberia(+231)</option>
                            <option value={218}>Libya(+218)</option>
                            <option value={417}>Liechtenstein(+417)</option>
                            <option value={370}>Lithuania(+370)</option>
                            <option value={352}>Luxembourg(+352)</option>
                            <option value={853}>Macao(+853)</option>
                            <option value={389}>Macedonia(+389)</option>
                            <option value={261}>Madagascar(+261)</option>
                            <option value={265}>Malawi(+265)</option>
                            <option value={60}>Malaysia(+60)</option>
                            <option value={960}>Maldives(+960)</option>
                            <option value={223}>Mali(+223)</option>
                            <option value={356}>Malta(+356)</option>
                            <option value={692}>MarshallIslands(+692)</option>
                            <option value={596}>Martinique(+596)</option>
                            <option value={222}>Mauritania(+222)</option>
                            <option value={269}>Mayotte(+269)</option>
                            <option value={52}>Mexico(+52)</option>
                            <option value={691}>Micronesia(+691)</option>
                            <option value={373}>Moldova(+373)</option>
                            <option value={377}>Monaco(+377)</option>
                            <option value={976}>Mongolia(+976)</option>
                            <option value={1664}>Montserrat(+1664)</option>
                            <option value={212}>Morocco(+212)</option>
                            <option value={258}>Mozambique(+258)</option>
                            <option value={95}>Myanmar(+95)</option>
                            <option value={264}>Namibia(+264)</option>
                            <option value={674}>Nauru(+674)</option>
                            <option value={977}>Nepal(+977)</option>
                            <option value={31}>Netherlands(+31)</option>
                            <option value={687}>NewCaledonia(+687)</option>
                            <option value={64}>NewZealand(+64)</option>
                            <option value={505}>Nicaragua(+505)</option>
                            <option value={227}>Niger(+227)</option>
                            <option value={234}>Nigeria(+234)</option>
                            <option value={683}>Niue(+683)</option>
                            <option value={672}>NorfolkIslands(+672)</option>
                            <option value={670}>NorthernMarianas(+670)</option>
                            <option value={47}>Norway(+47)</option>
                            <option value={968}>Oman(+968)</option>
                            <option value={680}>Palau(+680)</option>
                            <option value={507}>Panama(+507)</option>
                            <option value={675}>PapuaNewGuinea(+675)</option>
                            <option value={595}>Paraguay(+595)</option>
                            <option value={51}>Peru(+51)</option>
                            <option value={63}>Philippines(+63)</option>
                            <option value={48}>Poland(+48)</option>
                            <option value={351}>Portugal(+351)</option>
                            <option value={1787}>PuertoRico(+1787)</option>
                            <option value={974}>Qatar(+974)</option>
                            <option value={262}>Reunion(+262)</option>
                            <option value={40}>Romania(+40)</option>
                            <option value={7}>Russia(+7)</option>
                            <option value={250}>Rwanda(+250)</option>
                            <option value={378}>SanMarino(+378)</option>
                            <option value={239}>SaoTome&amp;Principe(+239)</option>
                            <option value={966}>SaudiArabia(+966)</option>
                            <option value={221}>Senegal(+221)</option>
                            <option value={381}>Serbia(+381)</option>
                            <option value={248}>Seychelles(+248)</option>
                            <option value={232}>SierraLeone(+232)</option>
                            <option value={65}>Singapore(+65)</option>
                            <option value={421}>SlovakRepublic(+421)</option>
                            <option value={386}>Slovenia(+386)</option>
                            <option value={677}>SolomonIslands(+677)</option>
                            <option value={252}>Somalia(+252)</option>
                            <option value={27}>SouthAfrica(+27)</option>
                            <option value={34}>Spain(+34)</option>
                            <option value={94}>SriLanka(+94)</option>
                            <option value={290}>St.Helena(+290)</option>
                            <option value={1869}>St.Kitts(+1869)</option>
                            <option value={1758}>St.Lucia(+1758)</option>
                            <option value={249}>Sudan(+249)</option>
                            <option value={597}>Suriname(+597)</option>
                            <option value={268}>Swaziland(+268)</option>
                            <option value={46}>Sweden(+46)</option>
                            <option value={41}>Switzerland(+41)</option>
                            <option value={963}>Syria(+963)</option>
                            <option value={886}>Taiwan(+886)</option>
                            <option value={7}>Tajikstan(+7)</option>
                            <option value={66}>Thailand(+66)</option>
                            <option value={228}>Togo(+228)</option>
                            <option value={676}>Tonga(+676)</option>
                            <option value={1868}>Trinidad&amp;Tobago(+1868)</option>
                            <option value={216}>Tunisia(+216)</option>
                            <option value={90}>Turkey(+90)</option>
                            <option value={7}>Turkmenistan(+7)</option>
                            <option value={993}>Turkmenistan(+993)</option>
                            <option value={1649}>Turks&amp;CaicosIslands(+1649)</option>
                            <option value={688}>Tuvalu(+688)</option>
                            <option value={256}>Uganda(+256)</option>
                            <option value={44}>UK(+44)</option>
                            <option value={380}>Ukraine(+380)</option>
                            <option value={971}>UnitedArabEmirates(+971)</option>
                            <option value={598}>Uruguay(+598)</option>
                            <option value={1}>USA(+1)</option>
                            <option value={7}>Uzbekistan(+7)</option>
                            <option value={678}>Vanuatu(+678)</option>
                            <option value={379}>VaticanCity(+379)</option>
                            <option value={58}>Venezuela(+58)</option>
                            <option value={84}>Vietnam(+84)</option>
                            <option value={84}>VirginIslands-British(+1284)</option>
                            <option value={84}>VirginIslands-US(+1340)</option>
                            <option value={681}>Wallis&amp;Futuna(+681)</option>
                            <option value={969}>Yemen(North)(+969)</option>
                            <option value={967}>Yemen(South)(+967)</option>
                            <option value={260}>Zambia(+260)</option>
                            <option value={263}>Zimbabwe(+263)</option>
                        </select>
                        <InputError
                            messages={errors.country_code}
                            className="mt-2"
                        />

                        </div>
                        <div className = "col-span-2">
                        <Label htmlFor="mobileNumber">
                            Phone Number (optional)
                        </Label>
                        <Input
                            id="mobileNumber"
                            type="text"
                            value={mobileNumber}
                            pattern="[0-9]{7,10}"
                            className="block mt-1 w-full"
                            onChange={onMobileNumberChangeHandler}
                        />
                        </div>
                        
                    </div>

                    <IcCheckingInputs
                        onCustomerChange={onExistingCustomerHandler}
                        icNumber={IcNumber}
                        icTypeId={IcTypeId}
                        icColorId={IcColorId}
                        icExpiryDate={IcExpiryDate}

                        oriIcNumber={IcNumberOrig}
                        oriIcTypeId={IcTypeIdOrig}
                        oriExpiryDate={OriIcExpiryDate}
                        oriIcColorId={OriIcColorId}

                        setIcNumber={setIcNumber}
                        setIcTypeId={setIcTypeId}
                        setIcColorId={setIcColorId}
                        setIcExpiryDate={setIcExpiryDate}
                        updateMode={updateModeValue}

                    />

                <div className="my-4">
                        <Label htmlFor="countryId">Country</Label>
                        <select
                        id="countryId"
                        value={countryId}
                        required
                        onChange={ev => setCountryId(ev.target.value)}>
                            {countries.map((country) => (
                            <option value={country.id}>{country.name}</option>
                            ))}
                        </select>

                        <InputError
                            messages={errors.country_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="customerTitleId">
                            Customer Title (optional)
                        </Label>

                        <select
                            id="customerTitleId"
                            value={customerTitleId}
                            onChange={onCustomerTitleIdChangeHandler}>
                            <option>Select One</option>
                            <option value={1}>Mr</option>
                            <option value={2}>Ms</option>
                            <option value={3}>Mrs</option>
                            <option value={4}>Haji</option>
                            <option value={5}>Hajah</option>
                            <option value={6}>Dr</option>
                        </select>

                        <InputError
                            messages={errors.customer_title_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="accountCategoryId">
                            Account Category
                        </Label>

                        <select
                            id="accountCategoryId"
                            value={accountCategoryId}
                            required
                            onChange={onAccountCategoryIdChangeHandler}>
                            <option value={1}>Brunei Personal</option>
                            <option value={2}>Foreign Personal</option>
                            <option value={3}>Company</option>
                            <option value={4}>Embassy</option>
                            <option value={5}>Government</option>
                        </select>

                        <InputError
                            messages={errors.account_category_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="birthDate">Birth Date</Label>

                        <Input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            className="block mt-1 w-full"
                            required
                            onChange={onBirthDateChangeHandler}
                        />

                        <InputError
                            messages={errors.birth_date}
                            className="mt-2"
                        />
                    </div>

                    <AddressInputs
                        district={district}
                        mukim={mukim}
                        village={village}
                        postalCode={postalCode}
                        village_id={village_id}
                        district_id={district_id}
                        mukim_id={mukim_id}
                        postal_code_id={postal_code_id}
                        houseNumber={houseNumber}
                        simpang={simpang}
                        street={street}
                        buildingName={buildingName}
                        block={block}
                        floor={floor}
                        unit={unit}
                        setDistrict={setDistrict}
                        setMukim={setMukim}
                        setVillage={setVillage}
                        setPostalCode={setPostalCode}
                        setVillageId={setVillageId}
                        setDistrictId={setDistrictId}
                        setMukimId={setMukimId}
                        setPostalCodeId={setPostalCodeId}
                        setHouseNumber={setHouseNumber}
                        setSimpang={setSimpang}
                        setStreet={setStreet}
                        setBuildingName={setBuildingName}
                        setBlock={setBlock}
                        setFloor={setFloor}
                        setUnit={setUnit}
                    />

                    <div className="mt-4">
                        <Label htmlFor="icFront">Ic Front</Label>

                        <Input
                            id="icFront"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={onIcFrontChangeHandler}
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="icBack">Ic Back</Label>

                        <Input
                            id="icBack"
                            type="file"
                            className="block mt-1 w-full"
                            onChange={onIcBackChangeHandler}
                        />
                    </div>
                    <div className="p-6 bg-white border-b border-gray-200">
                        {icUrls.map(obj => (
                            <img
                                key={obj.id}
                                src={obj.url}
                                className="inline-block w-40 mr-4"
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4 bg-gray-100">Save changes</Button>
                    </div>
                </form>
            </MainBody>
        </AppLayout>
    )
}

export default Update
