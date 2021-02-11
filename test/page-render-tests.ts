declare var test: TestFn;
import { ClientFunction, Selector, t } from 'testcafe';

// Fail if there is any error on client
export default async function checkErrors(): Promise<void> {
    const { error } = await t.getBrowserConsoleMessages();
    await t.expect(error[0]).notOk();
}

const url = 'http://localhost:4000/page?mock=default-page';
fixture('Default Page tests').page(url);

const getWindowLocation = ClientFunction(() => window.location);

test('validate renderPage div render', async (testController: TestController) => {
    console.log('url: ', await getWindowLocation());
    const renderPageDiv = Selector('#renderPage');
    await testController.expect(renderPageDiv.exists).eql(true, 'Could not find default page container');
});

test('validate carousel module render', async (testController: TestController) => {
    const featureModule = Selector('main .feature');
    await testController
            .expect(featureModule.exists)
            .eql(true, 'Could not find Feature module');

    await testController
        .expect(featureModule.innerText)
        .contains('Shop our latest collection', 'Could not find headline');
});